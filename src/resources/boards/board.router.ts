import { Router as router } from 'express';
import * as boardsService from './board.service';

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.getBoard(req.params.id);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json('Board not found');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { title, columns } = req.body;
    const board = await boardsService.save(title, columns);
    if (board) {
      res.status(201).json(board);
    } else {
      res.status(400).json('Bad request');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const { title, columns } = req.body;
    const board = await boardsService.update(req.params.id, title, columns);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(400).json('Bad request');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const result = await boardsService.deleteBoard(req.params.id);
    if (result) {
      res.status(204).json('The board has been deleted');
    } else {
      res.status(404).json('Board not found');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

module.exports = router;
