const blogsRouter = require('express').Router();
const { response } = require('../app');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({});
  response.json(result);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
