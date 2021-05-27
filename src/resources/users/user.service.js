const usersRepo = require('./user.memory.repository');
/**
 * Return all users
 * @returns {User[]} all users
 */
const getAll = () => usersRepo.getAll();
/**
 * Return found user by id
 * @param {string} id user id
 * @returns {User|undefined} found user or undefined if user is not found
 */
const getUser = (id) => usersRepo.getById(id);
/**
 * Save user and return it
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {User} added user
 */
const save = (name, login, password) => usersRepo.save(name, login, password);
/**
 * Update user and return it
 * @param {string} id user id
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {User|undefined} saved user or undefined if user is not found
 */
const update = (id, name, login, password) => usersRepo.update(id, name, login, password);
/**
 * Delete user
 * @param {string} id user id
 * @returns {boolean} true or false
 */
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, save, update, deleteUser };
