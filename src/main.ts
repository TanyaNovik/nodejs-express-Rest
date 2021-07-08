import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { load } from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app =
    process.env.USE_FASTIFY === 'true'
      ? await NestFactory.create<NestFastifyApplication>(
          AppModule,
          new FastifyAdapter(),
        )
      : await NestFactory.create(AppModule);
  await app.listen(process.env.PORT, '0.0.0.0', () => {
    Logger.log(
      `Run ${
        process.env.USE_FASTIFY === 'true' ? 'fastify' : 'express'
      } server`,
      'Main.ts',
    );
  });
  const swaggerDocument = load(join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('/doc', app, swaggerDocument);
}

bootstrap();
