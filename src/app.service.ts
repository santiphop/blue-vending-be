import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ConfigService } from './infrastructure/configs/config.service';

export class HealthCheckResponseDto {
  @ApiProperty({ example: 'OK' })
  readonly status!: string;

  @ApiProperty({ example: 'blue-vending-be' })
  readonly name!: string;

  @ApiProperty({ example: '1.0.0' })
  readonly version!: string;
}

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHealth(): HealthCheckResponseDto {
    return {
      status: 'up',
      name: this.configService.appName,
      version: this.configService.appVersion,
    };
  }
}
