import { getRepository } from 'typeorm';
import { BoardDB } from './entities/board.entity';
/**
 * Return all boards
 * @returns {Board[]} all boards
 */
const getAll = async (): Promise<BoardDB[]> => {
  const boardRepository = await getRepository(BoardDB);
  const allBoards = await boardRepository.find({ where: {} });
  return allBoards;
};
/**
 * Return found board by id
 * @param {string} id need board id
 * @returns {Board|null} found board or null if board is not found
 */
const getById = async (id: string): Promise<BoardDB | null> => {
  const boardRepository = await getRepository(BoardDB);
  const findBoard = await boardRepository.findOne(id);
  return findBoard ?? null;
};
/**
 * Save board and return it
 * @param {string} title board title
 * @param {Column[]} columns board columns
 * @returns {Board} new saved board
 */
const save = async (title: string, columns: []): Promise<BoardDB> => {
  const boardRepository = await getRepository(BoardDB);
  const newBoard = await boardRepository.create({ title, columns });
  await boardRepository.save(newBoard);
  return newBoard;
};
/**
 * Update board and return it
 * @param {string} id board id
 * @param {string} title new board title
 * @param {Column[]} columns new board columns
 * @returns {Board|null} updated board or null if board is not found
 */
const update = async (
  id: string,
  title: string,
  columns: [],
): Promise<BoardDB | null> => {
  const boardRepository = await getRepository(BoardDB);
  let findBoard = await boardRepository.findOne(id);
  if (findBoard === undefined) return null;
  await boardRepository.update(id, { title, columns });
  findBoard = await boardRepository.findOne(id);
  return findBoard ?? null;
};
/**
 * Delete board
 * @param {string} id board id
 * @returns {boolean} true or false
 */
const deleteBoard = async (id: string): Promise<boolean> => {
  const boardRepository = await getRepository(BoardDB);
  const deletedBoard = await boardRepository.delete(id);
  if (deletedBoard.affected) {
    return true;
  }
  return false;
};
export { getAll, save, getById, update, deleteBoard };
