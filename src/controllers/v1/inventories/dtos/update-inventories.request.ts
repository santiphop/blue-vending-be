import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { IsNonEmptyString } from 'src/controllers/decorators/string.validator';
import { Trim } from 'src/controllers/decorators/trim.transformer';

class InventoryDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNonEmptyString()
  @Trim()
  id!: string;

  @ApiProperty({
    type: 'number',
    required: false,
  })
  @IsInt()
  @IsOptional()
  itemNumber?: number;

  @ApiProperty({
    type: 'number',
    required: false,
  })
  @IsInt()
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    type: 'number',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: string;
}

export class UpdateInventoriesRequestDto {
  @ApiProperty({
    description: 'Machine ID',
  })
  @IsNonEmptyString()
  @Trim()
  machineId!: string;

  @ApiProperty({
    isArray: true,
    description: 'Products to be updated',
  })
  @ValidateNested()
  @Type(() => InventoryDto)
  @ArrayUnique((inventory: InventoryDto) => inventory?.id)
  @ArrayMinSize(1)
  @IsArray()
  inventories!: InventoryDto[];
}
