import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

export const config = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/*/entities/*{.ts,.js}'],
  migrations: ['dist/migration/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'src/migration/',
    entitiesDir: 'src/*/entities/*{.ts,.js}',
  },
  migrationsRun: true,
  synchronize: false,
} as ConnectionOptions;
