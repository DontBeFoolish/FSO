import { useState, useEffect } from 'react'
import personServices from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    personServices.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const shownPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.find(person => person.name === newName)

    if (existing) {
      if (!confirm(`${newName} already exists`)) return
      const updatedPerson = { ...existing, number: newNumber }

      personServices
        .update(existing.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => 
            person.id === existing.id ? returnedPerson : person
          ))
          setNewName('')
          setNewNumber('')
        })

    } else {
      
      const personObj = {
        name: newName,
        number: newNumber,
      }
  
      personServices.create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          console.log(err)
        })
    }

  }

  const deletePerson = (id, name) => {
    if (!confirm(`Delete ${name}?`)) return
    
    personServices.remove(id)
      .then(() =>
        setPersons(persons.filter(person => person.id !== id))
      )
      .catch(err => {
        console.log(err)
        alert(`${name} has already been deleted`)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>

      <h2>AddNew</h2>
      <PersonForm onSubmit={addPerson} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons shownPersons={shownPersons} onClick={(id, name) => deletePerson(id, name)} />      
    </div>
  )
}

export default App