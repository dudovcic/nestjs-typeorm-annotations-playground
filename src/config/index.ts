import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from './database';

interface iConfig {
  env: string;
  port: number;
  database: TypeOrmModuleOptions;
}

export default (): Partial<iConfig> => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: dbConfig(),
});
