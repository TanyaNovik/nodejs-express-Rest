import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  @Post('/login')
  async login(@Request() req) {
    console.log('2222222222', process.env.JWT_SECRET_KEY);
    return this.authService.login(req.user);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
