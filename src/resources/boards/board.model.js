const uuid = require('uuid').v4;
const Column = require('./column.model');

class Board {
  /**
   * Create board
   * @param {string} id board id
   * @param {string} title board title
   * @param {Column[]} columns board columns
   */
  constructor({
                id = uuid(),
                title = 'title',
                columns = []
              } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [];
    columns.forEach(col => {
      this.columns.push(new Column({title:col.title, order:col.order}));
    });
  }

}

module.exports = Board;
