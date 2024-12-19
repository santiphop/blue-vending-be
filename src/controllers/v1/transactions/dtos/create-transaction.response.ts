import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  Currency,
  FormOfCurrency,
} from 'src/domain/entities/currencies.entity';

class CurrencyDto implements Partial<Currency> {
  @ApiProperty()
  @Expose()
  form!: FormOfCurrency;

  @ApiProperty()
  @Expose()
  value!: number;

  @ApiProperty()
  @Expose()
  quantity!: number;
}

export class CreateTransactionResponseDto {
  @ApiProperty({ type: CurrencyDto })
  @Expose()
  @Type(() => CurrencyDto)
  changes!: Currency[];
}

export class DataWrapperCreateTransactionResponseDto {
  @ApiProperty({ type: 'boolean' })
  @Expose()
  success!: boolean;

  @ApiProperty({ type: CreateTransactionResponseDto })
  @Expose()
  @Type(() => CreateTransactionResponseDto)
  data!: CreateTransactionResponseDto;
}
