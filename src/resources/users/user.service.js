const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUser = (id) => usersRepo.getById(id);
const save = (name, login, password) => usersRepo.save(name, login, password);
const update = (id, name, login, password) => usersRepo.update(id, name, login, password);
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, save, update, deleteUser };
