const bcryptjs = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 });
  return response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const result = await User.findById(request.params.id).populate('blogs', { title: 1 });

  if (!result) {
    return response.status(404).end();
  }

  return response.json(result);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  if (password.length < 3) {
    return response.status(400).json({ error: 'minimum password length of 3' });
  }

  const saltRounds = 10;
  const passwordHash = await bcryptjs.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

module.exports = usersRouter;
