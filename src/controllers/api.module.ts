import { Module } from '@nestjs/common';

import { ControllerV1 } from './v1/controller.module';

@Module({
  imports: [ControllerV1],
})
export class ApiModule {}
