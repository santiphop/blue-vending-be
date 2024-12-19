import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService, HealthCheckResponseDto } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health-check')
  @ApiResponse({ status: HttpStatus.OK, type: HealthCheckResponseDto })
  getHealth(): HealthCheckResponseDto {
    return this.appService.getHealth();
  }
}
