const Persons = ({ persons, onClick }) => persons.map(person => (
  <p key={person.id}>
    {person.name} {person.number}
    <button key={person.id} name={person.name} value={person.id} onClick={onClick}>
      delete
    </button>
  </p>
))

export default Persons