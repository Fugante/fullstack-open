import { useEffect, useState } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import Countries from "./components/Countries"
import Country from "./components/Country"


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => setCountries(response.data))
  }, [])

  const displayCountries = () => {
    if (filter === "") {
      return
    }

    let filteredCountries = countries.filter(country => (
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    ))

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    else if (filteredCountries.length > 1) {
      return <Countries countries={filteredCountries} />
    }
    else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />
    }

  }

  return (
    <>
      <Filter filter={filter} onChange={(event) => setFilter(event.target.value)} />
      {displayCountries()}
    </>
  )
}

export default App