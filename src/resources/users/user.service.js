const usersRepo = require('./user.memory.repository');
/**
 * Return all users
 * @returns {Promise<User[]>} all users
 */
const getAll = () => usersRepo.getAll();
/**
 * Return found user by id
 * @param {string} id user id
 * @returns {Promise<User>} found user
 */
const getUser = (id) => usersRepo.getById(id);
/**
 * Save user and return it
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {Promise<User>} added user
 */
const save = (name, login, password) => usersRepo.save(name, login, password);
/**
 * Update user and return it
 * @param {string} id user id
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {Promise<User>} saved user
 */
const update = (id, name, login, password) => usersRepo.update(id, name, login, password);
/**
 * Delete user
 * @param {string} id user id
 * @returns {Promise<boolean>} true or false
 */
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, save, update, deleteUser };
