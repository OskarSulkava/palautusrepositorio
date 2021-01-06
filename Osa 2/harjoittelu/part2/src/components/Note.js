import React from 'react'

// Muistiin panon määrittelevä komponentti
const Note = ({note, toggleImportance}) => {
    const label = note.important 
        ? 'Make not important' : 'Make important'

    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

export default Note