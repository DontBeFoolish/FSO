const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

/* eslint-disable no-param-reassign, no-underscore-dangle */
blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});
/* eslint-disable no-param-reassign, no-underscore-dangle */

module.exports = mongoose.model('Blog', blogSchema);
