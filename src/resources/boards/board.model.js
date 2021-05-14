const uuid = require('uuid').v4;

class Board {
  constructor({
                id = uuid(),
                title = 'title',
                columns = [
                ]
              } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
    this.columns[0].id = uuid();
  }

}

module.exports = Board;
