import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserDB } from './User';
import { BoardDB } from './Board';
import { ColumnDB } from './Colunm';

@Entity({name: 'task'})
export class TaskDB {

  @PrimaryGeneratedColumn('uuid')
  id:string | undefined;

  @Column('varchar', {length: 25})
  title:string;

  @Column('integer')
  order:number;

  @Column('varchar', {length: 45})
  description:string;

  @ManyToOne(() => UserDB, user => user.id)
  userId: string;

  @ManyToOne(() => BoardDB, board => board.id)
  boardId: string;

  @ManyToOne(() => ColumnDB, column => column.id)
  columnId: string;

}