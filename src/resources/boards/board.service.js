const boardsRepo = require('./board.memory.repository');
/**
 * Return all boards
 * @returns {Board[]} all boards
 */
const getAll = () => boardsRepo.getAll();
/**
 * Return found board by id
 * @param {string} id need board id
 * @returns {Board|undefined} found board or undefined if board is not found
 */
const getBoard = (id) => boardsRepo.getById(id);
/**
 * Save board and return it
 * @param {string} title board title
 * @param {Column[]} columns board columns
 * @returns {Board} new saved board
 */
const save = (title, columns) => boardsRepo.save(title, columns);
/**
 * Update board and return it
 * @param {string} id board id
 * @param {string} title new board title
 * @param {Column[]} columns new board columns
 * @returns {Board|undefined} updated board or undefined if board is not found
 */
const update = (id, title, columns) => boardsRepo.update(id, title, columns);
/**
 * Delete board and return it
 * @param {string} id board id
 * @returns {boolean} true or false
 */
const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = {getAll, getBoard, save, update, deleteBoard };
