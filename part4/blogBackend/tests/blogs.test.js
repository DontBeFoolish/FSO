const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');

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
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('the correct number of blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.length, 2);
});

test('the unique id property of blog posts is id', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach((b) => {
    assert.ok(b.id);
    assert.ok(!b._id);
  });
});

test('valid blog can be added', async () => {
  const newBlog = {
    title: 'Third Blog',
    author: 'Joe Blow',
    url: 'http://example.com/blog3',
    likes: 15,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  assert(titles.includes('Third Blog'));
});

test('blog posted without likes will default to 0', async () => {
  const newBlog = {
    title: 'Fourth Blog',
    author: 'Mary Moe',
    url: 'http://example.com/blog4',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201);

  const response = await api.get('/api/blogs');
  const addedBlog = response.body.find((b) => b.title === 'Fourth Blog');

  assert.strictEqual(addedBlog.likes, 0);
});

test('blog posted without title is rejected', async () => {
  const newBlog = {
    author: 'The Joker',
    url: 'http://example.com/blog5',
    likes: 15,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('blog posted without url is rejected', async () => {
  const newBlog = {
    title: 'Fifth Blog',
    author: 'Michael Scott',
    likes: 15,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

after(async () => mongoose.connection.close());
