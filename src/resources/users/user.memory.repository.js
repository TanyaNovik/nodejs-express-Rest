const User = require('./user.model');
const tasksService = require('../tasks/task.service');

const allUsers = [];
const getAll = async () => allUsers;
const getById = async (id) => allUsers.find(user => user.id === id);

const save = async (name, login, password) => {
  const newUser = new User({name, login, password});
  allUsers.push(newUser);
  return newUser;
};

const update = async (id, name, login, password) => {
  const needUser = allUsers.find(user => user.id === id);
  needUser.name = name;
  needUser.login = login;
  needUser.password = password;
  return needUser;
}

const deleteUser = async (id) => {
  const index = allUsers.findIndex(user => user.id === id);
  const result = allUsers.splice(index, 1);
  if(result){
    await tasksService.anonymizeAssignee(id);
  }
  return result;
}
module.exports = { getAll, getById, save, update, deleteUser };
