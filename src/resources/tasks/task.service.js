const tasksRepo = require('./task.memory.repository');

/**
 * Return all tasks
 * @returns {Promise<Task[]>} all tasks
 */
const getAll = () => tasksRepo.getAll();
/**
 * Return found task by id
 * @param {string} id task id
 * @returns {Promise<Task>} found task
 */
const getTask = (id) => tasksRepo.getById(id);
/**
 * Save task and return it
 * @param {string} title task title
 * @param {number} order task order
 * @param {string} description task description
 * @param {string} userId id of task owner
 * @param {string} boardId id of bord where task is
 * @param {string} columnId id of column where task is
 * @returns {Promise<Task>} added task
 */
const save = (title, order, description, userId, boardId, columnId) => tasksRepo.save(title, order, description, userId, boardId, columnId);
/**
 * Update task and return it
 * @param {string} id task id
 * @param {string} title task title
 * @param {number} order task order
 * @param {string} description task description
 * @param {string} userId id of task owner
 * @param {string} boardId id of bord where task is
 * @param {string} columnId id of column where task is
 * @returns {Promise<null|Task>} saved task or null
 */
const update = (id, title, order, description, userId, boardId, columnId) => tasksRepo.update(id, title, order, description, userId, boardId, columnId);
/**
 * Delete task
 * @param {string} id task id
 * @returns {Promise<Task[]>} deleted task
 */
const deleteTaskById = (id) => tasksRepo.deleteTaskById(id);
/**
 * Delete task by board id
 * @param {string} boardId board id
 * @returns {Promise<void>}
 */
const deleteTaskByBordId = (boardId) => tasksRepo.deleteTaskByBordId(boardId);
/**
 * Anonymize task
 * @param {string} userId user id
 * @returns {Promise<void>}
 */
const anonymizeAssignee = (userId) => tasksRepo.anonymizeAssignee(userId);

module.exports = {getAll, getTask, save, update, deleteTaskById, deleteTaskByBordId, anonymizeAssignee };
