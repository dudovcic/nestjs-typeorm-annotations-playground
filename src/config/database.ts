import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.POSTGRES_SSL === 'true',
  //   entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  // We are using migrations, synchronize should be set to false.
  // synchronize: false,
  synchronize: true,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: false,
  //   migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
  //   cli: {
  //     migrationsDir: join(__dirname, '../migrations'),
  //     entitiesDir: join(__dirname, '../**/*.entity{.ts,.js}'),
  //   },
  // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  autoLoadEntities: true,
});

if (process.env.NODE_ENV === 'development') {
  Logger.debug(dbConfig());
}

export default dbConfig();
