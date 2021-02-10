import React from 'react'


const Show = (props) => {

    
    return (
        <div key={props.name}>
        <p key={props.name}>{props.name}</p> {/*<button key={props.name} float="right">Show</button> Ei toimi*/}
        </div>
    )
}

export default Show