import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Find from './components/Find'
import TheList from './components/TheList'


const App = () => {

    const [term, setTerm] = useState('')
    const [countries, setCountries] = useState([])


    const handleFindChange = (event) => {
        console.log(event.target.value)
        setTerm(event.target.value)
    }

    
    const hookFind = () => {
        if(term !== ''){
            axios
                .get(`https://restcountries.eu/rest/v2/name/${term}`)
                .then(response => {
                    console.log('promise fulfilled')
                    
                    setCountries(response.data)
                })
        }
        else{
            axios
                .get('https://restcountries.eu/rest/v2/all')
                .then(response => {
                    console.log('promise fulfilled')
                    
                    setCountries(response.data)
                })
        }
    }
    useEffect(hookFind, [term])
    console.log(countries.length)
    

    return (
        <div>
            <Find onChange={handleFindChange} term={term} hook={hookFind} />
            <TheList countries={countries} />
        </div>
    )
}

export default App