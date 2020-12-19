import React from 'react'
import Person from './Person'

const Contacts = ({list, filter}) => {
    
    let filtered = []
    
    if(filter !== ''){
        filtered = list.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    }
    else{
        filtered = list
    }
    
    return (
        
        <Person list={filtered} />
    )
}

export default Contacts