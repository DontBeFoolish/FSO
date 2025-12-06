import { useState, useEffect } from 'react'
import personService from './services/people'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import People from './components/People'
import Notification from './components/Notification'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notificationInfo, setNotificationInfo] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
      })
  }, [])

  const shownPeople = people.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const existing = people.find(person => person.name === newName)

    if (existing) {
      if (!confirm(`${newName} already exists`)) return
      const updatedPerson = { ...existing, number: newNumber }

      personService
        .update(existing.id, updatedPerson)
        .then(returnedPerson => {
          setPeople(people.map(person => 
            person.id === existing.id ? returnedPerson : person
          ))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          console.log(err)
          setNotificationInfo({ message: err.response.data.error, type: 'error' })
          setTimeout(() => setNotificationInfo(null), 3000)
        })

    } else {
      
      const personObj = {
        name: newName,
        number: newNumber,
      }
  
      personService.create(personObj)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson))
          setNotificationInfo({ message: `added ${newName} to directory`, type: 'success' })
          setTimeout(() => setNotificationInfo(null), 3000)
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          console.log(err)
          setNotificationInfo({ message: err.response.data.error, type: 'error' })
          setTimeout(() => setNotificationInfo(null), 3000)
        })
    }

  }

  const deletePerson = (id, name) => {
    if (!confirm(`Delete ${name}?`)) return
    
    personService.remove(id)
      .then(() => {
        setPeople(people.filter(person => person.id !== id))
        setNotificationInfo({ message:`${name} deleted`, type:'success' })
        setTimeout(() => setNotificationInfo(null), 3000)
      }
    )
      .catch(err => {
        console.log(err)
        setNotificationInfo({ message:`${name} has already been deleted`, type:'error' })
        setTimeout(() => setNotificationInfo(null), 3000)
      })
  }

  return (
    <div>
      <Notification info={notificationInfo}/>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>

      <h2>AddNew</h2>
      <PersonForm onSubmit={addPerson} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <People shownPeople={shownPeople} onClick={(id, name) => deletePerson(id, name)} />      
    </div>
  )
}

export default App