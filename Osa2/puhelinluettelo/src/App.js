import React, {useState, useEffect} from 'react'
import Contacts from './components/Contacts'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotif from './components/ErrorNotif'



const App = () => {
    const [person, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
        .getAll()
            .then(initialPerson =>{
                setPersons(initialPerson)
            })
    }, [])
    

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber   
        }
        
        if(person.some(p => p.name === newName)){
            
            let p = person.find(val => val.name === newName)
            
            console.log(p) 
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                personService
                .update(p.id, personObject)
                .then(returnedPerson => {
                    
                    setPersons(person.map(pe => pe.id !== p.id ? pe : returnedPerson))

                    setSuccessMessage(
                        `Persons ${returnedPerson.name} number was succesfully changed`
                    )
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    let msg = error.response.data.error
                    setErrorMessage(
                        msg
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)

                    setPersons(person.filter(person => person.id !== p.id))
                })
            }
            
        }
        else{
            personService
            .create(personObject)
            .then(returnedPerson => { //Posti palauttaa tiedon siitä, mitä ollaan lähetetty ja itse response.data sisältää lähetetyt tiedot, ne palautetaan returnedPersonina ja luodaan uusi lista johon tämä lisätään
                setPersons(person.concat(returnedPerson))

                setSuccessMessage(
                    `Person ${returnedPerson.name} was succesfully added`
                )
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
            })
            .catch(error => {
                console.log(error.response.data)
                console.log(error.response.data.error)
                let msg = error.response.data.error // Asetetaan serveriltä tuleva error viesti
                setErrorMessage(
                    msg
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })

            setNewName('')
            setNewNumber('')
        }
    }

    const deletePerson = (id, name) =>{
        if(window.confirm(`Delete ${name}?`)){
            personService
            .remove(id)
                .then(response => {
                    
                    setPersons(person.filter(p => p.id !== id)) //Lisätään uuteen listaan kaikki ne joiden id ei ole poistetun id

                    setSuccessMessage(
                        `Person ${name} was succesfully deleted`
                    )
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
                .catch(error => {

                    setErrorMessage(
                        `Information of ${name} has already been removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setPersons(person.filter(person => person.id !== id)) //Filtteröidään uuteen listaan kaikki muut paitsi jo poistettu id
                })
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={successMessage} />
            <ErrorNotif message={errorMessage} />
            <div>
                Filter shown with: <input
                                        value={newFilter}
                                        onChange={handleFilterChange}
                                    />
                
            </div>
            
            <h2>Add new</h2>
            <PersonForm 
                onSubmit={addPerson} 
                valueName={newName} 
                valueNumber={newNumber} 
                onNameChange={handleNameChange} 
                onNumberChange={handleNumberChange} 
            />
            <h2>Numbers</h2>
            <div>
                <Contacts list={person} filter={newFilter} deletePerson={deletePerson} />
            </div>
        </div>
    )
}

export default App