import Column from './column.model';
import Board from './board.model';
import * as boardsRepo from './board.memory.repository';
/**
 * Return all boards
 * @returns {Board[]} all boards
 */
const getAll = () => boardsRepo.getAll();
/**
 * Return found board by id
 * @param {string} id need board id
 * @returns {Board|null} found board or null if board is not found
 */
const getBoard = (id: string): Board | null => boardsRepo.getById(id);
/**
 * Save board and return it
 * @param {string} title board title
 * @param {Column[]} columns board columns
 * @returns {Board} new saved board
 */
const save = (title:string, columns:Column[]) => boardsRepo.save(title, columns);
/**
 * Update board and return it
 * @param {string} id board id
 * @param {string} title new board title
 * @param {Column[]} columns new board columns
 * @returns {Board|null} updated board or null if board is not found
 */
const update = (id: string, title: string, columns: Column[]): Board | null => boardsRepo.update(id, title, columns);
/**
 * Delete board and return it
 * @param {string} id board id
 * @returns {boolean} true or false
 */
const deleteBoard = (id: string): boolean => boardsRepo.deleteBoard(id);

export {getAll, getBoard, save, update, deleteBoard };
