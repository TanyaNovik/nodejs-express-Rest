import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import usersService from './users.service';
import { UserDB, IUserPrivate } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return UserDB.toResponse(user);
    // try {
    //   const { name, login, password } = createUserDto;
    //   const user = await this.usersService.create({ name, login, password });
    //   if (user) {
    //     res.status(201).json(UserDB.toResponse(user));
    //   } else {
    //     res.status(400).json('Bad request');
    //   }
    // } catch {
    //   res.status(401).json('Access token is missing or invalid');
    // }
  }

  @Get()
  async findAll(): Promise<IUserPrivate[]> {
    const users = await this.usersService.getAll();
    return users.map(UserDB.toResponse);
    // try {
    //   res.status(200).json(users.map(UserDB.toResponse));
    // } catch {
    //   res.status(401).json('Access token is missing or invalid');
    // }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return UserDB.toResponse(user);
    // try {
    //   const user = await this.usersService.findOne(id);
    //   if (user) {
    //     res.status(200).json(UserDB.toResponse(user));
    //   } else {
    //     res.status(404).json('User not found');
    //   }
    // } catch {
    //   res.status(401).json('Access token is missing or invalid');
    // }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    res,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    return UserDB.toResponse(user);
    // try {
    //   const { name, login, password } = updateUserDto;
    //   const user = await this.usersService.update(id, {
    //     name,
    //     login,
    //     password,
    //   });
    //   if (user) {
    //     res.status(200).json(UserDB.toResponse(user));
    //   } else {
    //     res.status(400).json('Bad request');
    //   }
    // } catch {
    //   res.status(401).json('Access token is missing or invalid');
    // }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, res) {
    const result = await this.usersService.remove(id);
    if (result) {
      return 'The user has been deleted';
    } else {
      return 'User not found';
    }
    // try {
    //   const result = await this.usersService.remove(id);
    //   if (result) {
    //     res.status(204).json('The user has been deleted');
    //   } else {
    //     res.status(404).json('User not found');
    //   }
    // } catch {
    //   res.status(401).json('Access token is missing or invalid');
    // }
  }
}
