const assert = require('node:assert');
const {
  test,
  after,
  beforeEach,
  describe,
} = require('node:test');
const supertest = require('supertest');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Blog = require('../models/blog');
const User = require('../models/user');
const app = require('../app');
const { initialBlogs, nonExistentID, usersInDb } = require('../utils/blog_helper');

const api = supertest(app);

describe('blog creation', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  });

  test('the correct number of blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test('the unique id property of blog posts is id', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach((b) => {
      assert.ok(b.id);
      assert.ok(!b._id);
    });
  });

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Joe Blow',
      url: 'http://example.com/blog3',
      likes: 15,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfter = await api.get('/api/blogs');
    assert.strictEqual(blogsAfter.body.length, initialBlogs.length + 1);

    const titles = blogsAfter.body.map((r) => r.title);
    assert(titles.includes('New Blog'));
  });

  test('sets vote value to 0 if missing', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Mary Moe',
      url: 'http://example.com/blog4',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201);

    const blogsAfter = await api.get('/api/blogs');
    assert.strictEqual(blogsAfter.body.length, initialBlogs.length + 1);

    const addedBlog = blogsAfter.body.find((b) => b.title === 'New Blog');
    assert.strictEqual(addedBlog.likes, 0);
  });

  test('fails with missing title', async () => {
    const newBlog = {
      author: 'The Joker',
      url: 'http://example.com/blog5',
      likes: 15,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAfter = await api.get('/api/blogs');
    assert.strictEqual(blogsAfter.body.length, initialBlogs.length);
  });

  test('fails with missing url', async () => {
    const newBlog = {
      title: 'Fifth Blog',
      author: 'Michael Scott',
      likes: 15,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAfter = await api.get('/api/blogs');
    assert.strictEqual(blogsAfter.body.length, initialBlogs.length);
  });
});

describe('blog deletion', () => {
  test('succeeds with code 204 if valid id', async () => {
    const blogsBefore = await api.get('/api/blogs');
    const blogToDelete = blogsBefore.body[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfter = await api.get('/api/blogs');
    const blogTitles = blogsAfter.body.map((b) => b.title);

    assert(!blogTitles.includes(blogToDelete.title));
    assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length - 1);
  });
  test('fails with code 400 if invalid id', async () => {
    const invalidId = '5a3d5da59070081a82a3445';
    await api.delete(`/api/blogs/${invalidId}`).expect(400);
  });
  test('fails with code 404 if nonexistent id', async () => {
    const id = await nonExistentID();
    await api.delete(`/api/blogs/${id}`).expect(404);
  });
});

describe('update likes', () => {
  test('succeeds with code 200 valid id', async () => {
    const blogsBefore = await api.get('/api/blogs');

    const updatedBlog = await api
      .put(`/api/blogs/${blogsBefore.body[2].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    assert.strictEqual(updatedBlog.body.likes, blogsBefore.body[2].likes + 1);
  });
  test('fails with code 400 invalid id', async () => {
    const invalidId = '5a3d5da59070081a82a3445';
    await api.put(`/api/blogs/${invalidId}`).expect(400);
  });
  test('fails with code 404 nonexistent id', async () => {
    const id = await nonExistentID();
    await api.put(`/api/blogs/${id}`).expect(404);
  });
});

describe('when only one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcryptjs.hash('eepy', 10);
    const user = new User({
      username: 'root',
      passwordHash,
      name: 'rooty',
    });
    await user.save();
  });

  test('creation succeeds with a new username', async () => {
    const usersBefore = await usersInDb();

    const newUser = {
      username: 'burgah boy',
      name: 'jex',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await usersInDb();
    assert.strictEqual(usersAfter.length, usersBefore.length + 1);
  });

  test('duplicate username fails with code 400', async () => {
    const usersBefore = await usersInDb();
    const newUser = {
      username: 'root',
      password: 'password',
      name: 'rooty',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await usersInDb();
    assert.strictEqual(usersAfter.length, usersBefore.length);
  });
});

after(async () => mongoose.connection.close());
