import Task from './task.model';

let allTasks = [];
/**
 * Return all tasks
 * @returns {Task[]} all tasks
 */
const getAll = () => allTasks;
/**
 * Return found task by id
 * @param {string} id task id
 * @returns {Task|null} found task or null if task is not found
 */
const getById = (id) => allTasks.find(board => board.id === id) ?? null;
/**
 * Save task and return it
 * @param {string} title task title
 * @param {number} order task order
 * @param {string} description task description
 * @param {string} userId id of task owner
 * @param {string} boardId id of bord where task is
 * @param {string} columnId id of column where task is
 * @returns {Task} added task
 */
const save = (title, order, description, userId, boardId, columnId) => {
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
 * @returns {null|Task>} saved task or null
 */
const update = (id, title, order, description, userId, boardId, columnId) => {
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
 * @returns {Task[]} deleted task
 */
const deleteTaskById = (id) => {
  const index = allTasks.findIndex(task => task.id === id);
  return allTasks.splice(index, 1);
}
/**
 * Delete task by board id
 * @param {string} boardId board id
 */
const deleteTaskByBordId = (boardId)  => {
  allTasks = allTasks.filter(task => task.boardId !== boardId);
}
/**
 * Search tasks where owner id = userId and set userId for that task null
 * @param {string} userId user id
 */
const anonymizeAssignee = (userId) => {
  allTasks.map(task => {
    if(task.userId === userId){
      const newTask = Object.assign(task, {userId:null});
      return newTask
    }
    return task;
  });
}
module.exports = { getAll, save, getById, update, deleteTaskById, deleteTaskByBordId, anonymizeAssignee};
