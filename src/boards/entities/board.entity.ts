import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'board' })
export class BoardDB {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar', { length: 25 })
  title: string;

  @Column('json')
  columns: [];
}
