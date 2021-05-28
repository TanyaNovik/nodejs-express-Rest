import User from './user.model';
import tasksService from '../tasks/task.service';

const allUsers = [];
/**
 * Return all users
 * @returns {User[]} all users
 */
const getAll = () => allUsers;
/**
 * Return found user by id
 * @param {string} id user id
 * @returns {User|null} found user or null if user is not found
 */
const getById = (id) => allUsers.find(user => user.id === id) ?? null;
/**
 * Save user and return it
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {User} added user
 */
const save = (name, login, password) => {
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
 * @returns {User|null} saved user or null if user is not found
 */
const update = (id, name, login, password) => {
  const needUser = allUsers.find(user => user.id === id);
  if(needUser){
    needUser.name = name;
    needUser.login = login;
    needUser.password = password;
    return needUser
  }
  return null;
}
/**
 * Delete user
 * @param {string} id user id
 * @returns {boolean} true or false
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
