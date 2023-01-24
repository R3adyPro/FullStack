import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Weather = ({ capital }) => {
    const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${WEATHER_API_KEY}`)
        .then(response => {
            setWeather(response.data)
        })
    })
    console.log(weather.current)
  return (
    <div>
      <h1>Wheather in {capital}</h1>
      <p>Tempature: {weather.main.temp} celsius</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );

};

export default Weather;