import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
// import path from 'path';
// import { load } from 'yamljs';
// import { SwaggerModule } from '@nestjs/swagger';

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
  // const document = SwaggerModule.createDocument(app, swaggerDocument);
  // SwaggerModule.setup('/doc', app, document);
}
// const swaggerDocument = load(path.join(__dirname, '../doc/api.yaml'));

bootstrap();
