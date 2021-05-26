const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getTask = (id) => tasksRepo.getById(id);
const save = (title, order, description, userId, boardId, columnId) => tasksRepo.save(title, order, description, userId, boardId, columnId);
const update = (id, title, order, description, userId, boardId, columnId) => tasksRepo.update(id, title, order, description, userId, boardId, columnId);
const deleteTaskById = (id) => tasksRepo.deleteTaskById(id);
const deleteTaskByBordId = (boardId) => tasksRepo.deleteTaskByBordId(boardId);
const anonymizeAssignee = (userId) => tasksRepo.anonymizeAssignee(userId);

module.exports = {getAll, getTask, save, update, deleteTaskById, deleteTaskByBordId, anonymizeAssignee };
