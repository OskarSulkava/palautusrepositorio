import React from 'react'
import Show from './Show'


const TheList = ({countries}) => {

    
    console.log(Object.keys(countries).length)
    
    if(Object.keys(countries).length > 10){
        return (
            <p>Too many matches, specify another filter</p>
        )
    }else if(Object.keys(countries).length === 1){
        const lang = countries[0].languages
        
        return (
            <div>
                <div>
                    <h1>{countries[0].name}</h1>
                </div>
                <div>
                    <p>Capital {countries[0].capital}</p>
                    <p>Population {countries[0].population}</p>
                </div>
                <div>
                    <h1>Languages</h1>
                    <ul>
                        {lang.map(language =>
                            <li key={language.name}>{language.name}</li>)}
                    </ul>
                </div>
                <div>
                    <img src={countries[0].flag} alt={countries[0].name} width="70" height="50" />
                </div>
            </div>
            
        )
    }else{
        return (
            countries.map(country => 
                <Show name={country.name} />    
            )
        )
    
    }
    
}

export default TheList