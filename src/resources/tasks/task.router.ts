import Router from 'express';
import * as tasksService from '../tasks/task.service';

const router = Router();

router.route('/:boardId/tasks').get(async (_, res) => {
  try {
    const tasks = await tasksService.getAll();
    res.status(200).json(tasks);
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.getTask(req.params.taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json('Task not found');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  try {
    const { title, order, description, userId, columnId } = req.body;
    const task = await tasksService.save(title, order, description, userId, req.params.boardId, columnId);
    if (task) {
      res.status(201).json(task);
    } else {
      res.status(400).json('Bad request');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  try {
    const { title, order, description, userId, columnId } = req.body;
    const task = await tasksService.update(req.params.taskId, title, order, description, userId, req.params.boardId, columnId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(400).json('Bad request');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    const result = await tasksService.deleteTaskById(req.params.taskId);
    if (result) {
      res.status(204).json('The task has been deleted');
    } else {
      res.status(404).json('Task not found');
    }
  } catch {
    res.status(401).json('Access token is missing or invalid');
  }
});

export default router;
