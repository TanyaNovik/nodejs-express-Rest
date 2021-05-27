const User = require('./user.model');
const tasksService = require('../tasks/task.service');

const allUsers = [];
/**
 * Return all users
 * @returns {Promise<User[]>} all users
 */
const getAll = async () => allUsers;
/**
 * Return found user by id
 * @param {string} id user id
 * @returns {Promise<User>} found user
 */
const getById = async (id) => allUsers.find(user => user.id === id);
/**
 * Save user and return it
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {Promise<User>} added user
 */
const save = async (name, login, password) => {
  const newUser = new User({name, login, password});
  allUsers.push(newUser);
  return newUser;
};
/**
 * Update user and return it
 * @param {string} id user id
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {Promise<User>} saved user
 */
const update = async (id, name, login, password) => {
  const needUser = allUsers.find(user => user.id === id);
  needUser.name = name;
  needUser.login = login;
  needUser.password = password;
  return needUser;
}
/**
 * Delete user
 * @param {string} id user id
 * @returns {Promise<boolean>} true or false
 */
const deleteUser = async (id) => {
  const index = allUsers.findIndex(user => user.id === id);
  const result = allUsers.splice(index, 1);
  if(result){
    await tasksService.anonymizeAssignee(id);
    return true
  }
  return false;
}
module.exports = { getAll, getById, save, update, deleteUser };
