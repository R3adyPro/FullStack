import React, { useState, useEffect } from 'react';
import axios from 'axios'
import SingleCountry from './components/SingleCountry';
import Weather from './components/Weather';

const App = (props) => {
  const [query, setQuery] = useState([])
  const [country, setCountry] = useState([])
  const [countries, setCountries] = useState([])

  useEffect(() => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
  })


  const handleChange = (event) => {
    setQuery(event.target.value)
    setCountry(
      countries.filter(country  => country.name.common.toLowerCase().includes(query))
    )
    console.log(country, "!!")
  }

  return (
    <div>
      <form>
        <div>
          find country: <input 
          onChange={handleChange}
          />
        </div>
      </form>
      <br></br>
      <div>
        {country.length > 10 ? (
          <div>too many matcges, specify another filter</div>
        ) : (country.length == 1 ? (
          <SingleCountry country={country[0]}/>
        ) : (country.map((country) => (
          <li key={country.id}>{country.name.common} <button id={country.name.common} onClick={() => { setCountry([country]); console.log(country, "!!!!!")}} >show</button></li>
        ))))}
      </div>
    </div>
  )
}

export default App 