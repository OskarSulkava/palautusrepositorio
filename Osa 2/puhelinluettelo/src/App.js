import React, {useState, useEffect} from 'react'
import Contacts from './components/Contacts'
import PersonForm from './components/PersonForm'
import axios from 'axios'


const App = () => {
    const [person, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }
    
    useEffect(hook, [])
    

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber   
        }
        
        console.log(newName)
        
        if(person.some(p => p.name === newName)){
            alert(` ${newName} is already added to phonebook`)
            
        }
        else{
            setPersons(person.concat(personObject))
            
            setNewName('')
            setNewNumber('')
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
                <Contacts list={person} filter={newFilter} />
            </div>
        </div>
    )
}

export default App