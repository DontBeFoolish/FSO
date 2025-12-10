const {
  test,
  after,
  beforeEach,
  describe,
} = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const app = require('../app');
const User = require('../models/user');
const { usersInDb } = require('../utils/blog_helper');

const api = supertest(app);

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
