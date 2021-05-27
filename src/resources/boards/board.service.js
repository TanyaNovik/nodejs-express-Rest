const boardsRepo = require('./board.memory.repository');
/**
 * Return all boards
 * @returns {Promise<Board[]>}all boards
 */
const getAll = () => boardsRepo.getAll();
/**
 * Return found board by id
 * @param {string} id need board id
 * @returns {Promise<Board>} found board
 */
const getBoard = (id) => boardsRepo.getById(id);
/**
 * Save board and return it
 * @param {string} title board title
 * @param {Column[]} columns board columns
 * @returns {Promise<Board>} new saved board
 */
const save = (title, columns) => boardsRepo.save(title, columns);
/**
 * Update board and return it
 * @param {string} id board id
 * @param {string} title new board title
 * @param {Column[]} columns new board columns
 * @returns {Promise<Board>} updated board
 */
const update = (id, title, columns) => boardsRepo.update(id, title, columns);
/**
 * Delete board and return it
 * @param {string} id board id
 * @returns {Promise<boolean>} true or false
 */
const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = {getAll, getBoard, save, update, deleteBoard };
