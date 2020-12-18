import React, {useState} from 'react'
import Contacts from './components/Contacts'

const App = () => {
    const [person, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1231244' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

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
            <form onSubmit={addPerson}>
                <div>
                    name: <input 
                            value={newName}
                            onChange={handleNameChange}
                            />
                </div>
                <div>
                    number: <input
                                value={newNumber}
                                onChange={handleNumberChange}
                            />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                <Contacts list={person} filter={newFilter} />
            </div>
        </div>
    )
}

export default App