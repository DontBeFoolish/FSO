require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (req, res) => {
  const time = new Date()
  const total = persons.length
  res.send(`
    <div>
      <p>Phonebook has info for ${total} people</p>
      <p>${time}</p>
    </div>
    `)
})

app.get('/api/people', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})

app.get('/api/people/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.post('/api/people', (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({ error: 'missing information' })
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })

  person.save().then(savedPerson => {
      res.json(savedPerson)
    })  
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`running on ${PORT}`)
})