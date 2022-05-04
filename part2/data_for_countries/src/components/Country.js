import { useState, useEffect } from "react"
import axios from "axios"


const API_KEY = process.env.REACT_APP_API_KEY

const Weather = ({ weather }) => {
  return (
    <>
      <p>temperature {weather.main.temp} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

const Country = ({ country }) => {
  const [capitalWeather, setCapitalWeather] = useState({})
  const query = (
    `https://api.openweathermap.org/data/2.5/weather?units=metric`
    + `&lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}`
    + `&appid=${API_KEY}`
  )

  useEffect(() => {
      axios.get(query).then(response => setCapitalWeather({...response.data}))
    }, [query]
  )

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {
          Object.values(country.languages)
          .map(language => <li key={language}>{language}</li>)
        }
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      <h2>Weather in {country.capital}</h2>
      {
        Object.keys(capitalWeather).length === 0 ?
          null : <Weather weather={capitalWeather}/>
      }
    </>
  )
}
export default Country