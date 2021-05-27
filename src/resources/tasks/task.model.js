const uuid = require('uuid').v4;

class Task {
  /**
   * Create task
   * @param {string} id task id
   * @param {string} title task title
   * @param {number} order task order
   * @param {string} description task description
   * @param {string} userId id of task owner
   * @param {string} boardId id of board where task is
   * @param {string} columnId id of column where task is
   */
  constructor({
                id = uuid(),
                title = 'title',
                order = 0,
                description = 'description',
                userId = 'userId',
                boardId = 'boardId',
                columnId = 'columnId'
              } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

}

module.exports = Task;
