import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserPrivate, UserDB } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(
    login: string,
    password: string,
  ): Promise<IUserPrivate | null> {
    const user = await this.usersService.getByProps(login);
    if (user && user.login === login) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDB) {
    console.log('login = ', user, process.env.JWT_SECRET_KEY);
    const payload = { login: user.login, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
