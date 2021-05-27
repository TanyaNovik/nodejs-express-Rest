const Board = require('./board.model');
const tasksService = require('../tasks/task.service');

const allBoards = [];
/**
 * Return all boards
 * @returns {Promise<Board[]>} all boards
 */
const getAll = async () => allBoards;
/**
 * Return found board by id
 * @param {string} id need board id
 * @returns {Promise<Board>} found board
 */
const getById = async (id) => allBoards.find(board => board.id === id);
/**
 * Save board and return it
 * @param {string} title board title
 * @param {Column[]} columns board columns
 * @returns {Promise<Board>} new saved board
 */
const save = async (title, columns) => {
  const newBoard = new Board({title, columns});
  allBoards.push(newBoard);
  return newBoard;
};
/**
 * Update board and return it
 * @param {string} id board id
 * @param {string} title new board title
 * @param {Column[]} columns new board columns
 * @returns {Promise<Board>} updated board
 */
const update = async (id, title, columns) => {
  const needBoard = allBoards.find(board => board.id === id);
  needBoard.title = title;
  needBoard.columns = columns;
  return needBoard;
}
/**
 * Delete board
 * @param {string} id board id
 * @returns {Promise<boolean>} true or false
 */
const deleteBoard = async (id) => {
  const index = allBoards.findIndex(board => board.id === id);
  const result = allBoards.splice(index, 1);
  if(result) {
    await tasksService.deleteTaskByBordId(id);
    return true;
  }
  return false;
}
module.exports = { getAll, save, getById, update, deleteBoard};
