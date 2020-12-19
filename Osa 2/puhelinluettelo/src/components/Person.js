import React from 'react'


const Person = ({list}) => {

    return (
        list.map(p =>
            <p key={p.name}>{p.name} {p.number} </p>
        )
    )
}

export default Person