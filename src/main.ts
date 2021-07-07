import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = process.env.USE_FASTIFY
    ? await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
      )
    : await NestFactory.create(AppModule);
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
