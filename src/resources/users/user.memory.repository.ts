import User from './user.model';
import * as tasksService from '../tasks/task.service';

const allUsers:User[] = [];
/**
 * Return all users
 * @returns {User[]} all users
 */
const getAll = ():User[] => allUsers;
/**
 * Return found user by id
 * @param {string} id user id
 * @returns {User|null} found user or null if user is not found
 */
const getById = (id: string): User | null => allUsers.find(user => user.id === id) ?? null;
/**
 * Save user and return it
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {User} added user
 */
const save = (name: string, login: string, password: string): User => {
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
const update = (id: string, name: string, login: string, password: string): User | null => {
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
const deleteUser = (id: string): boolean => {
  const index = allUsers.findIndex(user => user.id === id);
  const result = allUsers.splice(index, 1);
  if(result){
    tasksService.anonymizeAssignee(id);
    return true
  }
  return false;
}
export { getAll, getById, save, update, deleteUser };
