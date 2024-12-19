import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  ValidateNested,
} from 'class-validator';

import { IsNonEmptyString } from 'src/controllers/decorators/string.validator';
import { Trim } from 'src/controllers/decorators/trim.transformer';

class CurrencyDto {
  @ApiProperty({
    type: 'number',
  })
  @IsInt()
  value!: number;

  @ApiProperty({
    type: 'number',
  })
  @IsInt()
  quantity!: number;
}

export class CreateTransactionRequestDto {
  @ApiProperty({
    description: 'Inventory ID',
  })
  @IsNonEmptyString()
  @Trim()
  inventoryId!: string;

  @ApiProperty({
    description: 'Quantity of Inventory',
  })
  @IsInt()
  quantity!: number;

  @ApiProperty({
    isArray: true,
    description: 'Currencies that customer pays',
  })
  @ValidateNested()
  @Type(() => CurrencyDto)
  @ArrayUnique((currency: CurrencyDto) => currency?.value)
  @ArrayMinSize(1)
  @IsArray()
  currencies!: CurrencyDto[];
}
