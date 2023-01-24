import React from 'react';
import Weather from './Weather';

const SingleCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h4>languages</h4>
      {Object.values(country.languages).map((country) => (
        <li key={country}>{country}</li>
      ))}
      <br></br>
      <img src={country.flags.png}/>
      <Weather capital={country.capital}/>
    </div>
  );
};

export default SingleCountry;