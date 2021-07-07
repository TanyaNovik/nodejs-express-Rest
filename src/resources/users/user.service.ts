import * as usersRepo from './user.memory.repository';
import {UserDB} from '../../entities/User';

/**
 * Return all users
 * @returns {User[]} all users
 */
const getAll = ():Promise<UserDB[]> => usersRepo.getAll();
/**
 * Return found user by id
 * @param {string} id user id
 * @returns {User|null} found user or null if user is not found
 */
const getUser = (id: string): Promise<UserDB | null> => usersRepo.getById(id);
/**
 * Save user and return it
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {User} added user
 */
const save = (name: string, login: string, password: string): Promise<UserDB> => usersRepo.save(name, login, password);
/**
 * Update user and return it
 * @param {string} id user id
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {User|null} saved user or null if user is not found
 */
const update = (id: string, name: string, login: string, password: string): Promise<UserDB | null> => usersRepo.update(id, name, login, password);
/**
 * Delete user
 * @param {string} id user id
 * @returns {boolean} true or false
 */
const deleteUser = (id: string): Promise<boolean> => usersRepo.deleteUser(id);

const getByProps = (login: string): Promise<UserDB | null> => usersRepo.getByProps(login);

export { getAll, getUser, save, update, deleteUser, getByProps };
