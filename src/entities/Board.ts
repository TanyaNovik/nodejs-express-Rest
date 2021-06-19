import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {ColumnDB} from './Colunm'

@Entity({name: 'board'})
export class BoardDB {

  @PrimaryGeneratedColumn('uuid')
  id:string | undefined;

  @Column('varchar', {length: 25})
  title:string;

  @OneToMany(() => ColumnDB, column => column.id)
  columns: ColumnDB[];

}