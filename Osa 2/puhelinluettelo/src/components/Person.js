import React from 'react'


const Person = ({person, deletePerson}) => {

    return (
        <p>
            {person.name} {person.number} <button onClick={deletePerson}>Poista</button>
        </p>
    )
}

export default Person