import { getRepository } from 'typeorm';
// import Board from '../boards/board.model';
// import Column from '../boards/column.model';
import * as tasksService from '../tasks/task.service'
import {BoardDB} from '../../entities/Board';
import { ColumnDB } from '../../entities/Colunm';
// const allBoards:Board[] = [];
/**
 * Return all boards
 * @returns {Board[]} all boards
 */
const getAll = async():Promise<BoardDB[]> => {
  const boardRepository = await getRepository(BoardDB);
  const allBoards = await boardRepository.find({where:{}});
  return allBoards;
}
/**
 * Return found board by id
 * @param {string} id need board id
 * @returns {Board|null} found board or null if board is not found
 */
const getById = async (id:string):Promise<BoardDB|null> => {
  const boardRepository = await getRepository(BoardDB);
  const findBoard = await boardRepository.findOne(id);
  return findBoard ?? null;
}
/**
 * Save board and return it
 * @param {string} title board title
 * @param {Column[]} columns board columns
 * @returns {Board} new saved board
 */
const save = async (title:string, columns:ColumnDB[]):Promise<BoardDB> => {
  const boardRepository = await getRepository(BoardDB);
  const newBoard = boardRepository.create({title, columns});
  const savedBoard = boardRepository.save(newBoard);
  return savedBoard;
};
/**
 * Update board and return it
 * @param {string} id board id
 * @param {string} title new board title
 * @param {Column[]} columns new board columns
 * @returns {Board|null} updated board or null if board is not found
 */
const update = async (id:string, title:string, columns:ColumnDB[]):Promise<BoardDB|null> => {
  const boardRepository = await getRepository(BoardDB);
  const findBoard = await boardRepository.findOne(id);
  if(findBoard === undefined) return null;
  const updatedBoard = await boardRepository.update(id, {title, columns});
  return updatedBoard.raw;
}
/**
 * Delete board
 * @param {string} id board id
 * @returns {boolean} true or false
 */
const deleteBoard = async (id:string):Promise<boolean> => {
  const boardRepository = await getRepository(BoardDB);
  const deletedBoard = await boardRepository.delete(id);
  if(deletedBoard.affected) {
    tasksService.deleteTaskByBordId(id);
    return true;
  }
  return false;
}
export { getAll, save, getById, update, deleteBoard};
