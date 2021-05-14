const Board = require('./board.model');

const allBoards = [];
const getAll = async () => allBoards;
const getById = async (id) => allBoards.find(board => board.id === id);

const save = async (title, columns) => {
  const newBoard = new Board({title, columns});
  allBoards.push(newBoard);
  return newBoard;
};

const update = async (id, title, columns) => {
  const needBoard = allBoards.find(board => board.id === id);
  needBoard.title = title;
  needBoard.columns = columns;
  return needBoard;
}

const deleteBoard = async (id) => {
  const index = allBoards.findIndex(board => board.id === id);
  return allBoards.splice(index, 1);
}
module.exports = { getAll, save, getById, update, deleteBoard};
