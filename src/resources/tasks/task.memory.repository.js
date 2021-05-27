const Task = require('./task.model');

let allTasks = [];
/**
 * Return all tasks
 * @returns {Promise<Task[]>} all tasks
 */
const getAll = async () => allTasks;
/**
 * Return found task by id
 * @param {string} id task id
 * @returns {Promise<Task>} found task
 */
const getById = async (id) => allTasks.find(board => board.id === id);
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
const save = async (title, order, description, userId, boardId, columnId) => {
  const newTask = new Task({title, order, description, userId, boardId, columnId});
  allTasks.push(newTask);
  return newTask;
};
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
const update = async (id, title, order, description, userId, boardId, columnId) => {
  const needIndex = allTasks.findIndex(task => task.id === id);
  if(needIndex) {
    const newTask = new Task({id, title, order, description, userId, boardId, columnId});
    allTasks[needIndex] = newTask;
    return newTask;
  }
  return null;
}
/**
 * Delete task
 * @param {string} id task id
 * @returns {Promise<Task[]>} deleted task
 */
const deleteTaskById = async (id) => {
  const index = allTasks.findIndex(task => task.id === id);
  return allTasks.splice(index, 1);
}
/**
 * Delete task by board id
 * @param {string} boardId board id
 * @returns {Promise<void>}
 */
const deleteTaskByBordId = async (boardId) => {
  allTasks = allTasks.filter(task => task.boardId !== boardId);
}
/**
 * Search tasks where owner id = userId and set userId for that task null
 * @param {string} userId user id
 * @returns {Promise<void>}
 */
const anonymizeAssignee = async (userId) => {
  allTasks.map(task => {
    if(task.userId === userId){
      const newTask = Object.assign(task, {userId:null});
      return newTask
    }
    return task;
  });
}
module.exports = { getAll, save, getById, update, deleteTaskById, deleteTaskByBordId, anonymizeAssignee};
