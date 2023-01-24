import { useState, useEffect} from 'react'
import Notification from './components/Notification'
import PersonList from './components/PersonList'
import personsService from './services/personsService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState({
    name: '',
    number: ''
  })
  const [filter, setFilter] = useState([])
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    personsService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault()
    const current = persons.filter(
      (person) => person.name === newName.name
    );
    personsService.create(newName).then((person) => {
      if(current.length === 0){
        setPersons(persons.concat(person))
        setErrorMessage(`${newName.name} has been added`)
        setNewName({name: '', number: ''})
      } else{
        if(window.confirm(`${newName.name} is already in phonebook, do you want to update it?`)){
        personsService.update(current[0].id, newName).then((serverData) => {
          const update = persons.map((person) => person.id !== serverData.id ? person : serverData)
          setPersons(update)
        })}
      }
    })
  }

  const handleNameChange = (event) => {
    const { name, value } = event.target;
    setNewName({ ...newName, [name]: value });
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const deleteName = (id, name) => {
    console.log(id, name)
    if(window.confirm(`delete ${name}`)) {
      personsService.remove(id).then(()  => {
        const update = persons.filter((person) => person.id !== id)
        setPersons(update);
        setErrorMessage(`${name} was deleted from phonebook`)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
       Filter: <input value={filter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <div>
        <form onSubmit={addPerson}>
            <div>
              name:{" "}
              <input name="name" value={newName.name} onChange={handleNameChange} />
            </div>
            <div>
              number:{" "}
              <input name="number" value={newName.number} onChange={handleNameChange} />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
        </form>
      </div>
      <h2>Numbers</h2>
      <ul>
        {persons.map( person =>
          <PersonList key={person.id} person={person} deleteName={deleteName}/>
          )}
      </ul>
    </div>
  )

}

export default App