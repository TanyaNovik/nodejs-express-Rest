import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDB, IUserPrivate } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    if (user) {
      return UserDB.toResponse(user);
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  @Get()
  async findAll(): Promise<IUserPrivate[]> {
    const users = await this.usersService.getAll();
    return users.map(UserDB.toResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (user) {
      return UserDB.toResponse(user);
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    if (user) {
      return UserDB.toResponse(user);
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(id);
    if (result) {
      return 'The user has been deleted';
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
