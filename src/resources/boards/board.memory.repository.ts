import Board from './board.model';
import Column from './column.model';
import tasksService from '../tasks/task.service'

const allBoards:Board[] = [];
/**
 * Return all boards
 * @returns {Board[]} all boards
 */
const getAll = ():Board[] => allBoards;
/**
 * Return found board by id
 * @param {string} id need board id
 * @returns {Board|null} found board or null if board is not found
 */
const getById = (id:string):Board|null => allBoards.find(board => board.id === id) ?? null;
/**
 * Save board and return it
 * @param {string} title board title
 * @param {Column[]} columns board columns
 * @returns {Board} new saved board
 */
const save = (title:string, columns:Column[]):Board => {
  const newBoard = new Board({title, columns});
  allBoards.push(newBoard);
  return newBoard;
};
/**
 * Update board and return it
 * @param {string} id board id
 * @param {string} title new board title
 * @param {Column[]} columns new board columns
 * @returns {Board|null} updated board or null if board is not found
 */
const update = (id:string, title:string, columns:Column[]):Board|null => {
  const needBoard = allBoards.find(board => board.id === id);
  if(needBoard){
    needBoard.title = title;
    needBoard.columns = columns;
    return needBoard;
  }
  return null;
}
/**
 * Delete board
 * @param {string} id board id
 * @returns {boolean} true or false
 */
const deleteBoard = (id:string):boolean => {
  const index = allBoards.findIndex(board => board.id === id);
  const result = allBoards.splice(index, 1);
  if(result) {
    tasksService.deleteTaskByBordId(id);
    return true;
  }
  return false;
}
module.exports = { getAll, save, getById, update, deleteBoard};
