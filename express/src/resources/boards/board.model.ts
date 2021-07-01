import { v4 as uuid } from 'uuid';
import Column from '../boards/column.model';

class Board {
  id?: string;

  title: string;

  columns: Column[];

  /**
   * Create board
   * @param {string} id board id
   * @param {string} title board title
   * @param {Column[]} columns board columns
   */
  constructor({
                title,
                columns
              }:Board) {
    this.id = uuid();
    this.title = title;
    this.columns = [];
    columns.forEach((col: Column) => {
      this.columns.push(new Column({ title: col.title, order: col.order }));
    });
  }

}

export default Board;
