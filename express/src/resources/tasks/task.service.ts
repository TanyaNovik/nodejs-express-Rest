import * as tasksRepo from './task.memory.repository';
// import Task from './task.model';
import { TaskDB } from '../../entities/Task';

/**
 * Return all tasks
 * @returns {Task[]} all tasks
 */
const getAll = ():Promise<TaskDB[]> => tasksRepo.getAll();
/**
 * Return found task by id
 * @param {string} id task id
 * @returns {Task|null} found task or null if task is not found
 */
const getTask = (id: string): Promise<TaskDB | null> => tasksRepo.getById(id);
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
const save = (title: string, order: number, description: string, userId: string, boardId: string, columnId: string): Promise<TaskDB> => tasksRepo.save(title, order, description, userId, boardId, columnId);
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
const update = (id: string, title: string, order: number, description: string, userId: string, boardId: string, columnId: string): Promise<TaskDB|null> => tasksRepo.update(id, title, order, description, userId, boardId, columnId);
/**
 * Delete task
 * @param {string} id task id
 * @returns {Task[]} deleted task
 */
const deleteTaskById = (id: string): Promise<boolean> => tasksRepo.deleteTaskById(id);
/**
 * Delete task by board id
 * @param {string} boardId board id
 */
const deleteTaskByBordId = (boardId: string):Promise<void> => tasksRepo.deleteTaskByBordId(boardId);
/**
 * Anonymize task
 * @param {string} userId user id
 */
const anonymizeAssignee = (userId: string):Promise<void> => tasksRepo.anonymizeAssignee(userId);

export {getAll, getTask, save, update, deleteTaskById, deleteTaskByBordId, anonymizeAssignee };
