import {ConnectionOptions} from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const config = {
  // name: 'my-connection',
  type: 'postgres',
  migrationsRun: true,
  synchronize: false,
  logging: false,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [path.join(__dirname, '../entities/*{.ts,.js}')],
  migrations: [path.join(__dirname, '../migration/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migration/',
    entitiesDir: 'src/entities/*{.ts,.js}'
  }
} as ConnectionOptions;