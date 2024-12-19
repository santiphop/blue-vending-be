import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './infrastructure/configs/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './infrastructure/configs/config.service';
import { ApiModule } from './controllers/api.module';

@Module({
  imports: [
    ConfigModule,
    ApiModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.typeOrmDb,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
