import { Router as router } from 'express';
import * as usersService from './user.service';
import User from './user.model';

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }

});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getUser(req.params.id);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(404).json('User not found');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }

});

router.route('/').post(async (req, res) => {
  try {
    const { name, login, password } = req.body;
    const user = await usersService.save(name, login, password);
    if (user) {
      res.status(201).json(User.toResponse(user));
    } else {
      res.status(400).json('Bad request');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const { name, login, password } = req.body;
    const user = await usersService.update(req.params.id, name, login, password);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(400).json('Bad request');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }

});

router.route('/:id').delete(async (req, res) => {
  try {
    const result = await usersService.deleteUser(req.params.id);
    if (result) {
      res.status(204).json('The user has been deleted');
    } else {
      res.status(404).json('User not found');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }


});

export default router;
