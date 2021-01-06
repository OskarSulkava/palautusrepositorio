import React from 'react'
import Person from './Person'

const Contacts = ({list, filter, deletePerson}) => {
    
    let filtered = []
    
    if(filter !== ''){
        filtered = list.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    }
    else{
        filtered = list
    }
    
    return (

        filtered.map(person => {
            return(
            <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id, person.name)} />
            )
        })
        
        //<Person list={filtered} />
    )
}

export default Contacts