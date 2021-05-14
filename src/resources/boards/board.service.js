const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getBoard = (id) => boardsRepo.getById(id);
const save = (title, columns) => boardsRepo.save(title, columns);
const update = (id, title, columns) => boardsRepo.update(id, title, columns);
const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = {getAll, getBoard, save, update, deleteBoard };
