const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('requires password / password + name + number')
  process.exit(1)
}

const password = process.argv[2]
const url = 
  `mongodb+srv://vwbusiness98_db_user:${password}@cluster0.9l86yzi.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })


const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('requires 3 or 5 args')
  mongoose.connection.close()
}


