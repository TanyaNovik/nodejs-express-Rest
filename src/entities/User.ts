import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

interface IUserPrivate{
  id?:string;
  name:string;
  login:string;
}

@Entity({name: 'user'})
export class UserDB {
  
  @PrimaryGeneratedColumn('uuid')
  id:string | undefined;
  
  @Column('varchar', {length: 35})
  name:string;
  
  @Column('varchar', {length: 25})
  login:string;
  
  @Column('varchar', {length: 25})
  password:string;

  static toResponse(user:UserDB):IUserPrivate {
    const { id, name, login } = user;
    return { id, name, login };
  }
}