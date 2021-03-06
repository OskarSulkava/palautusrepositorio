/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json()) //json-parseri, joka helpottaa data lähettämistä oikeassa muodossa

morgan.token('content', (req, res) => JSON.stringify(req.body)) //Muutetaan objecti json stringiksi

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

// buildin kopiointi cp -r build ../../../FSOtehtävät/Osa3/puhelinluettelo-backend


app.get('/', (require, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (require, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (require, response) => {
  const date = Date()

  Person.countDocuments({}, (error, count) => {
    if (error){
      console.log(error)
    } else {
      response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
    }
  })


})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



app.post('/api/persons', (request, response, next) => {
  const body = request.body



  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'Both fields must be filled'
    })
  }


  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))



})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' }) //new:truella saamme jo muuttuneen olion suoraan käsittelyyn
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//Virheiden käsittelijä
const errorHandler = (error, request, response, next) => {
  console.log(error.name)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  }
  if(error.name === 'MongoError') {
    return response.status(400).send({ error: 'Name is already in phonebook' })
  }
  if(error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})