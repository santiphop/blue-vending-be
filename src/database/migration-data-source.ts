import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const { env } = process;

export const migrationDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: parseInt(env.DATABASE_PORT || '5432'),
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: ['dist/**/*.entity.{js,ts}'],
  synchronize: false,
  ...(env.NODE_ENV === 'production' && {
    ssl: {
      ca: Buffer.from(env.DATABASE_SSL_BASE64_CA || '', 'base64'),
    },
  }),
  migrationsTableName: 'Migrations',
  migrations: ['dist/database/migrations/*.{ts,js}'],
});
