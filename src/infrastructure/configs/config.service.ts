import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get isProduction(): boolean {
    return this.mode === 'production';
  }

  get isDevelopment(): boolean {
    return this.mode === 'development';
  }

  get appName(): string {
    return process.env.npm_package_name as string;
  }

  get appVersion(): string {
    return process.env.npm_package_version as string;
  }

  get port(): string {
    return this.configService.get('HTTP_PORT') ?? '3000';
  }

  get db() {
    return {
      host: this.configService.get('DATABASE_HOST') ?? 'localhost',
      port: this.configService.get('DATABASE_PORT') ?? '5432',
      name: this.configService.get('DATABASE_NAME') ?? 'consent-db',
      username: this.configService.get('DATABASE_USERNAME') ?? 'api',
      password: this.configService.get('DATABASE_PASSWORD') ?? 'api',
      sslBase64Ca: this.configService.get('DATABASE_SSL_BASE64_CA') ?? '',
    };
  }

  get typeOrmDb(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.db.host,
      port: this.db.port,
      username: this.db.username,
      password: this.db.password,
      database: this.db.name,
      entities: ['dist/**/*.entity.{js,ts}'],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  /**
   * Getter method to retrieve the current environment from the configuration service.
   * @returns The current environment as a string.
   * @example 'local', 'staging', 'test', 'uat', 'production'
   */
  get environment(): string {
    return this.configService.get('APP_ENV') as string;
  }

  /**
   * Getter method to retrieve the current mode from the configuration service.
   * @returns The current mode as a string.
   * @example 'development', 'production'
   */
  get mode(): string {
    return this.configService.get('NODE_ENV') as string;
  }
}
