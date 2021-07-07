import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hash } from 'bcrypt';

export interface IUserPrivate {
  id?: string;
  name: string;
  login: string;
}

@Entity({ name: 'user' })
export class UserDB {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar', { length: 35 })
  name: string;

  @Column('varchar', { length: 25 })
  login: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }

  static toResponse(user: UserDB): IUserPrivate {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
