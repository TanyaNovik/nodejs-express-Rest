import { getManager, getRepository } from 'typeorm';
import {UserDB} from '../../entities/User';
import * as tasksService from '../tasks/task.service';

/**
 * Return all users
 * @returns {User[]} all users
 */
const getAll = async ():Promise<UserDB[]> => {
  const userRepository = await getRepository(UserDB);
  const allUsers = await userRepository.find({where:{}});
  return allUsers;
}
/**
 * Return found user by id
 * @param {string} id user id
 * @returns {User|null} found user or null if user is not found
 */
const getById = async (id: string): Promise<UserDB | null> =>{
  const userRepository = getManager().getRepository(UserDB);
  const findUser = await userRepository.findOne(id);
  if(findUser === undefined) return null;
  return findUser;
}
/**
 * Save user and return it
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {User} added user
 */
const save = async (name: string, login: string, password: string): Promise<UserDB> => {
  const userRepository = getManager().getRepository(UserDB);
  const newUser = userRepository.create({name, login, password});
  const savedUser = userRepository.save(newUser);
  return savedUser;
};
/**
 * Update user and return it
 * @param {string} id user id
 * @param {string} name user name
 * @param {string} login user login
 * @param {string} password user password
 * @returns {User|null} saved user or null if user is not found
 */
const update = async(id: string, name: string, login: string, password: string): Promise<UserDB | null> => {
  const userRepository = getManager().getRepository(UserDB);
  const findUser = await userRepository.findOne(id);
  if(findUser === undefined) return null;
  const updatedUser = await userRepository.update(id, {name, login, password});
  return updatedUser.raw;
}
/**
 * Delete user
 * @param {string} id user id
 * @returns {boolean} true or false
 */
const deleteUser = async(id: string): Promise<boolean> => {
  const userRepository = getManager().getRepository(UserDB);
  const deletedUser = await userRepository.delete(id)
  if(deletedUser.affected){
    tasksService.anonymizeAssignee(id);
    return true
  }
  return false;
}
export { getAll, getById, save, update, deleteUser };
