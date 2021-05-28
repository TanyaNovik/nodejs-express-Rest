import { v4 as uuid } from 'uuid';

class Column {
  id: string;

  title: string;

  order: number;

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

export default Column;
