const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'John Doe',
    url: 'http://example.com/blog1',
    likes: 5,
  },
  {
    title: 'Second Blog',
    author: 'Jane Smith',
    url: 'http://example.com/blog2',
    likes: 10,
  },
  {
    title: 'Third Blog',
    author: 'Joe Montana',
    url: 'http://example.com/blog1',
    likes: 5,
  },
  {
    title: 'Fourth Blog',
    author: 'Albert Einstein',
    url: 'http://example.com/blog2',
    likes: 10,
  },
];

const nonExistentID = async () => {
  const newBlog = {
    title: 'delete',
    author: 'delete',
    url: 'delete',
  };
  await api.post('/api/blogs').send(newBlog);

  const blogs = await api.get('/api/blogs');
  const blogToDelete = blogs.body.find((b) => b.title === 'delete');
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  return blogToDelete.id;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs, nonExistentID, usersInDb,
};
