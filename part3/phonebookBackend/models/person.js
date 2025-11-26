const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('attempting to connect to db')
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to db')
  })
  .catch(error => {
    console.log('failed to connect to db', error)
  })

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)