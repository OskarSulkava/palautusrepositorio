
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json()) //json-parseri, joka helpottaa data lähettämistä oikeassa muodossa

morgan.token('content', (req, res) => JSON.stringify(req.body)) //Muutetaan objecti json stringiksi

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))



let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/', (require, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (require, response) => {
    response.json(persons)
})

app.get('/info', (require, response) => {
    const date = Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const newId = Math.random() * (1000000 - 1) + 1
    console.log(newId)
    return Math.ceil(newId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'Both fields must be filled'
        })
    } else if(persons.some(person => person.name === body.name)){
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})