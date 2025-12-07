const blogsRouter = require('express').Router();
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
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  if (!deletedBlog) {
    return response.status(404).end();
  }
  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  if (!request.params.body) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { $inc: { likes: 1 } },
      { new: true },
    );
    if (!updatedBlog) {
      return response.status(404).end();
    }
    return response.json(updatedBlog);
  }
});

module.exports = blogsRouter;
