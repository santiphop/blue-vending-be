import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

import { IsNonEmptyString } from 'src/controllers/decorators/string.validator';
import { Trim } from 'src/controllers/decorators/trim.transformer';

export class AddToInventoriesRequestDto {
  @ApiProperty({
    description: 'Machine ID',
  })
  @IsNonEmptyString()
  @Trim()
  machineId!: string;

  @ApiProperty({
    description: 'Product ID',
  })
  @IsNonEmptyString()
  @Trim()
  productId!: string;

  @ApiProperty({
    description: 'Quantity',
  })
  @IsInt()
  quantity!: number;

  @ApiProperty({
    description: 'Price',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;
}
