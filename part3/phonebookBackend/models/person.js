const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

console.log('attempting to connect to db');
mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected to db');
  })
  .catch((error) => {
    console.log('failed to connect to db', error);
  });

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => /^\d{2,3}-\d+$/.test(v),
    },
    required: true,
  },
});

/* eslint-disable no-param-reassign, no-underscore-dangle */
personSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});
/* eslint-disable no-param-reassign, no-underscore-dangle */

module.exports = mongoose.model('Person', personSchema);
