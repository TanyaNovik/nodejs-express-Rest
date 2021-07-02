import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as usersRepo from './user.memory.repository';

@Injectable()
export class UsersService {
  constructor() {
  }

  create(createUserDto: CreateUserDto) {
    return usersRepo.save(
      createUserDto.name,
      createUserDto.login,
      createUserDto.password,
    );
  }

  getAll() {
    return usersRepo.getAll();
  }

  findOne(id: string) {
    return usersRepo.getById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return usersRepo.update(
      id,
      updateUserDto.name,
      updateUserDto.login,
      updateUserDto.password,
    );
  }

  remove(id: string) {
    return usersRepo.deleteUser(id);
  }
}
