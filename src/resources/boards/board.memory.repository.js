const Board = require('./board.model');
const tasksService = require('../tasks/task.service');

const allBoards = [];
/**
 * Return all boards
 * @returns {Board[]} all boards
 */
const getAll = () => allBoards;
/**
 * Return found board by id
 * @param {string} id need board id
 * @returns {Board|null} found board or null if board is not found
 */
const getById = (id) => allBoards.find(board => board.id === id) ?? null;
/**
 * Save board and return it
 * @param {string} title board title
 * @param {Column[]} columns board columns
 * @returns {Board} new saved board
 */
const save = (title, columns) => {
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
const update = (id, title, columns) => {
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
const deleteBoard = (id) => {
  const index = allBoards.findIndex(board => board.id === id);
  const result = allBoards.splice(index, 1);
  if(result) {
    tasksService.deleteTaskByBordId(id);
    return true;
  }
  return false;
}
module.exports = { getAll, save, getById, update, deleteBoard};
