import React from 'react'

const PersonForm = (props) => {
    return (
        
        <form onSubmit = {props.onSubmit}>
            <div>
                name:   <input 
                            value = {props.valueName}
                            onChange = {props.onNameChange}
                        />
            </div>
            <div>
                number: <input
                            value = {props.valueNumber}
                            onChange = {props.onNumberChange}
                        />
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
            
    )
}

export default PersonForm