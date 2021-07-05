import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getRepository } from 'typeorm';
import { UserDB } from './entities/user.entity';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly tasksService: TasksService) {}

  async create(createUserDto: CreateUserDto) {
    const userRepository = await getRepository(UserDB);
    const newUser = await userRepository.create(createUserDto);
    const savedUser = await userRepository.save(newUser);
    return savedUser;
  }

  async getAll() {
    const userRepository = await getRepository(UserDB);
    const allUsers = await userRepository.find({ where: {} });
    return allUsers;
  }

  async findOne(id: string) {
    const userRepository = await getRepository(UserDB);
    const findUser = await userRepository.findOne(id);
    return findUser ?? null;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userRepository = await getRepository(UserDB);
    const findUser = await userRepository.findOne(id);
    if (findUser === undefined) return null;
    const updatedUser = await userRepository.update(id, updateUserDto);
    return updatedUser.raw;
  }

  async remove(id: string) {
    const userRepository = await getRepository(UserDB);
    await this.tasksService.anonymizeAssignee(id);
    const deletedUser = await userRepository.delete(id);
    if (deletedUser.affected) {
      return true;
    }
    return false;
  }

  async getByProps(login: string) {
    const userRepository = await getRepository(UserDB);
    const findUser = await userRepository.findOne({ login });
    return findUser ?? null;
  }
}
