import { useState } from "react"
import Country from "./Country"


const Countries = ({ countries }) => {
  const [displayCountries, setDisplayCountries] = useState([])

  const searchCountry = country => displayCountries.some(
    displayCountry => displayCountry.name.common === country.name.common
  )

  const addDisplayCountry = country => {
    if (searchCountry(country)) {
      return
    } 
    setDisplayCountries(displayCountries.concat(country))
  }

  return (
    countries.map(country => (
      <div key={country.name.official}>
        {country.name.common}
        <button onClick={() => addDisplayCountry(country)}>
          show
        </button>
          {searchCountry(country) ? <Country country={country} /> : <></>}
      </ div>
    ))
  )
}

export default Countries