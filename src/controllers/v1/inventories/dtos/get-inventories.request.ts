import { ApiProperty } from '@nestjs/swagger';

import { IsNonEmptyString } from 'src/controllers/decorators/string.validator';
import { Trim } from 'src/controllers/decorators/trim.transformer';

export class GetInventoriesPathParamDto {
  @ApiProperty({
    description: 'Machine ID',
  })
  @IsNonEmptyString()
  @Trim()
  machineId!: string;
}
