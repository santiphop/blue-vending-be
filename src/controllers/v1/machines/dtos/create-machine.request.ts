import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

import { IsNonEmptyString } from 'src/controllers/decorators/string.validator';
import { Trim } from 'src/controllers/decorators/trim.transformer';

export class CreateMachineRequestDto {
  @ApiProperty({
    description: 'Machine location',
  })
  @IsNonEmptyString()
  @Trim()
  location!: string;

  @ApiProperty({
    default: true,
    description: 'Is machine active',
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;
}
