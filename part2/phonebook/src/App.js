import { useState, useEffect } from "react"
import personService from "./services/persons"
import Filter  from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"


const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState("")
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [notifObject, setNotifObject] = useState(null)

  useEffect(() => {personService.getAll().then(persons => setPersons(persons))}, [])
  const filteredPersons = persons.filter(person => (
    person.name.toLocaleLowerCase().includes(filter) || person.number.includes(filter)
  ))

  const createNotfication = notifObject => {
    setNotifObject(notifObject)
    setTimeout(() => {setNotifObject(null)}, 5000)
  }

  const handlePersonChange = event => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)
    if (typeof(person) !== "undefined") {
      if (window.confirm(
        `${newName} is already added to the phonebook, replace old number with a new one?`
      )) {
        personService.update(person.id, {...person, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person
            ))
          })
          .catch(() => createNotfication(
            {
              message: (
                `Information of ${person.name} has already been removed from server`
              ),
              type: "error"
            }
          ))
      }
      return
    }

    personService.create({ name: newName, number: newNumber })
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        createNotfication({message: `Added ${returnedPerson.name}`, type: "notification"})
      })
  }

  const handlePersonDelete = event => {
    if (window.confirm(`Delete ${event.target.name}?`)) {
      const id = Number.parseInt(event.target.value)
      personService.remove(id)
        .then(() => {setPersons(persons.filter(person => person.id !== id))})
        .catch(() => createNotfication(
          {message: "That person has already been deleted", type: "error"}
        ))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notifObject={notifObject}/>
      <Filter
        filter={filter}
        onChange={event => setFilter(event.target.value.toLocaleLowerCase())}
      />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onSubmit={handlePersonChange}
        nameHandler={event => setNewName(event.target.value)}
        numberHandler={event => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onClick={handlePersonDelete} />
    </div>
  )
}

export default App