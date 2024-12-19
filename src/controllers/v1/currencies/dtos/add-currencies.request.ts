import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, ArrayUnique, IsArray, IsInt } from 'class-validator';

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

export class AddCurrenciesRequestDto {
  @ApiProperty({
    description: 'Machine ID',
  })
  @IsNonEmptyString()
  @Trim()
  machineId!: string;

  @ApiProperty({
    isArray: true,
    description: 'Currencies to be added to machine',
  })
  @ArrayUnique((currency: CurrencyDto) => currency?.value)
  @ArrayMinSize(1)
  @IsArray()
  currencies!: CurrencyDto[];
}
