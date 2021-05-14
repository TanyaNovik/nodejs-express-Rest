const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const {name, login, password} = req.body;
  const user = await usersService.save(name, login, password);
  res.status(201).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const {name, login, password} = req.body;
  const user = await usersService.update(req.params.id, name, login, password);
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.deleteUser(req.params.id);
  res.status(204).send('The user has been deleted');
});

module.exports = router;
