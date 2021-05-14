const uuid = require('uuid').v4;
const Column = require('./column.model');

class Board {
  constructor({
                id = uuid(),
                title = 'title',
                columns = []
              } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [];
    columns.forEach(col => {
      // const { title, order } = col;
      // console.log(colTitle)
      this.columns.push(new Column({title:col.title, order:col.order}));
    });
  }

}

module.exports = Board;
