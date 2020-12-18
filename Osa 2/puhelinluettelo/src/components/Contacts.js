import React from 'react'

const Contacts = ({list, filter}) => {
    
    let filtered = []
    
    if(filter !== ''){
        filtered = list.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    }
    else{
        filtered = list
    }
    
    return (
        filtered.map(person => 
            <p key={person.name}>{person.name} {person.number} </p>    
        )
    )
}

export default Contacts