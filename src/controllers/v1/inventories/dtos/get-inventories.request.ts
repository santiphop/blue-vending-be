import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

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

export class GetInventoriesPathQueryDto {
  @ApiProperty({
    description: 'Item Number',
  })
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  itemNumber?: number;
}
