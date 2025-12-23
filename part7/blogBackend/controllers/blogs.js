const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor, tokenExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return response.json(result);
});

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const { user } = request;

  if (!user) {
    return response.status(401).json({ error: 'userid missing or invalid' });
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    user: user._id,
    url: request.body.url,
    likes: 0,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 });
  return response.status(201).json(populatedBlog);
});

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const { user } = request;
  if (!user) {
    return response.status(401).json({ error: 'missing user' });
  }

  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' });
  }
  if (blogToDelete.user.toString() !== user.id) {
    return response.status(401).json({ error: 'unauthorized' });
  }

  await blogToDelete.deleteOne();
  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $inc: { likes: 1 } },
    { new: true },
  );
  if (!updatedBlog) {
    return response.status(404).end();
  }

  const populatedBlog = await updatedBlog.populate('user', { username: 1, name: 1 });
  return response.json(populatedBlog);
});

module.exports = blogsRouter;
