import { useState } from 'react';

import axios from  'axios';

const CountryDetails = ({country}) => {

  const [temperature, setTemperature] = useState(0)
  const [wind, setWind] = useState(0)
  const [icon, setIcon] = useState('')

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`).then((response) => {
      setTemperature(response.data.main.temp)
      setWind(response.data.wind.speed)
      setIcon(response.data.weather[0].icon)
  })


  return (
    <>
          <h1>{country.name}</h1>
          <div>capital: {country.capital[0]}</div>
          <div>area: {country.area}</div>
          <h2>languages</h2>
          <ul>
            {Object.values(country.languages).map(lang => (<li key={lang}>{lang}</li>))}
          </ul>
          <div>
            <img src={country.flags.png} alt={`${country.name} flag`} />
          </div>
          <h2>Weather in {country.capital[0]}</h2>
          <div>temperature {temperature}º Celsius</div>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
          <div>wind {wind} m/s</div>
        </>
  )
}

export default CountryDetails;