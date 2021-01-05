import React from 'react'

const Find = (props) => {

    console.log(props.term)
    return (
        <div>
            Find countries <input onChange={props.onChange}></input>
        </div>
    )
}

export default Find