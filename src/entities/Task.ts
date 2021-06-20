import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => UserDB)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public userId?: string | null;

  @ManyToOne(() => BoardDB,  { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  public boardId?: string;

  @ManyToOne(() => ColumnDB)
  @JoinColumn({ name: 'columnId', referencedColumnName: 'id' })
  public columnId?: string;

}