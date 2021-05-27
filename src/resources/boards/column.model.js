const uuid = require('uuid').v4;

class Column {
  /**
   * Create column
   * @param {string} id column id
   * @param {string} title column title
   * @param {number} order column order
   */
  constructor({
                id = uuid(),
                title = 'title',
                order = 0
              } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

}

module.exports = Column;
