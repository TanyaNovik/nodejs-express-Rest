import * as usersRepo from './user.memory.repository';
import User from './user.model';
/**
 * Return all users
 * @returns {User[]} all users
 */
const getAll = ():User[] => usersRepo.getAll();
/**
 * Return found user by id
 * @param {string} id user id
 * @returns {User|null} found user or null if user is not found
 */
const getUser = (id: string): User | null => usersRepo.getById(id);
/**
 * Save user and return it
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {User} added user
 */
const save = (name: string, login: string, password: string): User => usersRepo.save(name, login, password);
/**
 * Update user and return it
 * @param {string} id user id
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {User|null} saved user or null if user is not found
 */
const update = (id: string, name: string, login: string, password: string): User | null => usersRepo.update(id, name, login, password);
/**
 * Delete user
 * @param {string} id user id
 * @returns {boolean} true or false
 */
const deleteUser = (id: string): boolean => usersRepo.deleteUser(id);

export { getAll, getUser, save, update, deleteUser };
