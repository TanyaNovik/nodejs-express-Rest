import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserDB } from './entities/user.entity';
import { TasksService } from '../tasks/tasks.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    @InjectRepository(UserDB)
    private usersRepository: Repository<UserDB>,
    private readonly tasksService: TasksService,
  ) {
    this.createAdmin();
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }

  async getAll() {
    const allUsers = await this.usersRepository.find({ where: {} });
    return allUsers;
  }

  async findOne(id: string) {
    const findUser = await this.usersRepository.findOne(id);
    return findUser ?? null;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOne(id);
    if (findUser === undefined) return null;
    const updatedUser = await this.usersRepository.update(id, updateUserDto);
    return updatedUser.raw;
  }

  async remove(id: string) {
    await this.tasksService.anonymizeAssignee(id);
    const deletedUser = await this.usersRepository.delete(id);
    if (deletedUser.affected) {
      return true;
    }
    return false;
  }

  async getByProps(login: string) {
    const findUser = await this.usersRepository.findOne({ login });
    return findUser ?? null;
  }

  async createAdmin() {
    const userLogin = 'admin';
    const userPassword = 'admin';
    const userName = 'admin';

    const createdUser = await this.getByProps(userLogin);
    if (!createdUser) {
      await this.create({
        name: userName,
        login: userLogin,
        password: userPassword,
      });
    }
  }
}
