import { getRepository } from 'typeorm';
// import Task from './task.model';
import {TaskDB} from '../../entities/Task'
// let allTasks:Task[] = [];
/**
 * Return all tasks
 * @returns {Task[]} all tasks
 */
const getAll = async ():Promise<TaskDB[]> => {
  const taskRepository = await getRepository(TaskDB);
  const allTasks = await taskRepository.find({where:{}})
  return allTasks;
}
/**
 * Return found task by id
 * @param {string} id task id
 * @returns {Task|null} found task or null if task is not found
 */
const getById = async (id: string): Promise<TaskDB | null> => {
  const taskRepository = await getRepository(TaskDB);
  const findTask = await taskRepository.findOne(id);
  return findTask ?? null;
}
/**
 * Save task and return it
 * @param {string} title task title
 * @param {number} order task order
 * @param {string} description task description
 * @param {string} userId id of task owner
 * @param {string} boardId id of bord where task is
 * @param {string} columnId id of column where task is
 * @returns {Task} added task
 */
const save = async (title: string, order: number, description: string, userId: string, boardId: string, columnId: string): Promise<TaskDB> => {
  const taskRepository = await getRepository(TaskDB);
  const newTask = taskRepository.create({title, order, description, userId, boardId, columnId})
  const savedTask = taskRepository.save(newTask);
  return savedTask;
};
/**
 * Update task and return it
 * @param {string} id task id
 * @param {string} title task title
 * @param {number} order task order
 * @param {string} description task description
 * @param {string} userId id of task owner
 * @param {string} boardId id of bord where task is
 * @param {string} columnId id of column where task is
 * @returns {Task|null} saved task or null
 */
const update = async (id: string, title: string, order: number, description: string, userId: string, boardId: string, columnId: string): Promise<TaskDB|null> => {
  const taskRepository = await getRepository(TaskDB);
  const findTask = await taskRepository.findOne(id);
  if (findTask === undefined) return null;
  const updatedTask = await taskRepository.update(id, {id, title, order, description, userId, boardId, columnId})
  return updatedTask.raw;
}
/**
 * Delete task
 * @param {string} id task id
 * @returns {Task[]} deleted task
 */
const deleteTaskById = async (id: string): Promise<boolean> => {
  const taskRepository = await getRepository(TaskDB);
  const deletedTask = await taskRepository.delete(id);
  if(deletedTask.affected){
    return true;
  }
  return false;
}
/**
 * Delete task by board id
 * @param {string} boardId board id
 */
const deleteTaskByBordId = async (boardId: string):Promise<void>  => {
  const taskRepository = await getRepository(TaskDB);
  await taskRepository.delete(boardId);
  // allTasks = allTasks.filter(task => task.boardId !== boardId);
}
/**
 * Search tasks where owner id = userId and set userId for that task null
 * @param {string} userId user id
 */
const anonymizeAssignee = async (userId: string):Promise<void> => {
  const taskRepository = await getRepository(TaskDB);
  const findTasks = await taskRepository.find({where:{userId}});
  if(findTasks){
    findTasks.forEach((task:TaskDB) =>  taskRepository.update(task.id as string, {userId:null}))
  }
  // const updatedTask = await findTasks.update(id, {id, title, order, description, userId, boardId, columnId})

  // allTasks.map(task => {
  //   if(task.userId === userId){
  //     const newTask = Object.assign(task, {userId:null});
  //     return newTask
  //   }
  //   return task;
  // });
}
export { getAll, save, getById, update, deleteTaskById, deleteTaskByBordId, anonymizeAssignee};
