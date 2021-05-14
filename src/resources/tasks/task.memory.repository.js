const Task = require('./task.model');

const allTasks = [];
const getAll = async () => allTasks;
const getById = async (id) => allTasks.find(board => board.id === id);

const save = async (title, order, description, userId, boardId, columnId) => {
  const newTask = new Task({title, order, description, userId, boardId, columnId});
  allTasks.push(newTask);
  return newTask;
};

const update = async (id, title, order, description, userId, boardId, columnId) => {
  const needIndex = allTasks.findIndex(task => task.id === id);
  if(needIndex) {
    const newTask = new Task({id, title, order, description, userId, boardId, columnId});
    allTasks[needIndex] = newTask;
    return newTask;
  }
  return null;
}

const deleteTaskById = async (id) => {
  const index = allTasks.findIndex(task => task.id === id);
  return allTasks.splice(index, 1);
}
module.exports = { getAll, save, getById, update, deleteTaskById};
