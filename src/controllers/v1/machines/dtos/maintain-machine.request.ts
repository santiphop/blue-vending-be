import { ApiProperty } from '@nestjs/swagger';

import { IsNonEmptyString } from 'src/controllers/decorators/string.validator';
import { Trim } from 'src/controllers/decorators/trim.transformer';

export class MaintainMachinePathParamDto {
  @ApiProperty({
    description: 'Machine ID',
  })
  @IsNonEmptyString()
  @Trim()
  id!: string;
}
