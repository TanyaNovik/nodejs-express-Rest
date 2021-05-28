import { v4 as uuid } from 'uuid';

class Task {
  id?:string;

  title:string;

  order:number;

  description:string;

  userId:string;

  boardId:string;

  columnId:string;

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
  constructor({ title,
                order,
                description,
                userId,
                boardId,
                columnId
              }:Task) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

}

export default Task;
