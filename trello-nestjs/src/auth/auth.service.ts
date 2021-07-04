import { Injectable } from '@nestjs/common';
import { getByProps } from '../users/user.memory.repository';
import { JwtService } from '@nestjs/jwt';
import { IUserPrivate, UserDB } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    password: string,
  ): Promise<IUserPrivate | null> {
    const user = await getByProps(login);
    if (user && user.login === login) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDB) {
    console.log('login = ', user, process.env.JWT_SECRET_KEY)
    const payload = { login: user.login, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
