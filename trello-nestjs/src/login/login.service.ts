import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import * as usersService from './../users/user.memory.repository';
import { sign } from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor() {}

  async signToken(loginUser) {
    const user = await usersService.getByProps(loginUser);
    if (!user) {
      return null;
    }
    const { id, login } = user;
    const token = sign({ id, login }, process.env.JWT_SECRET_KEY);
    return token;
  }
}
