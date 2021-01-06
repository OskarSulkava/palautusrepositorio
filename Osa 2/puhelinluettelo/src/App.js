import React, {useState, useEffect} from 'react'
import Contacts from './components/Contacts'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
    const [person, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

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
                    console.log(returnedPerson)
                    setPersons(person.map(pe => pe.id !== p.id ? pe : returnedPerson))
                })
            }
            
        }
        else{
            personService
            .create(personObject)
                .then(returnedPerson => { //Posti palauttaa tiedon siitä, mitä ollaan lähetetty ja itse response.data sisältää lähetetyt tiedot, ne palautetaan returnedPersonina ja luodaan uusi lista johon tämä lisätään
                    setPersons(person.concat(returnedPerson))
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
                    console.log(response)
                    setPersons(person.filter(p => p.id !== id)) //Lisätään uuteen listaan kaikki ne joiden id ei ole poistetun id
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