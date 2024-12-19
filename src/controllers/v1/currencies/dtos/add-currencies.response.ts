import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  Currency,
  FormOfCurrency,
} from 'src/domain/entities/currencies.entity';
import { Machine } from 'src/domain/entities/machines.entity';

class MachineDto implements Partial<Machine> {
  @ApiProperty()
  @Expose()
  id!: string;

  @ApiProperty()
  @Expose()
  location!: string;

  @ApiProperty()
  @Expose()
  isActive!: boolean;
}

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

export class AddCurrenciesResponseDto {
  @ApiProperty({ type: MachineDto })
  @Expose()
  @Type(() => MachineDto)
  machine!: Machine;

  @ApiProperty({ type: CurrencyDto })
  @Expose()
  @Type(() => CurrencyDto)
  currencies!: Currency[];
}

export class DataWrapperAddCurrenciesResponseDto {
  @ApiProperty({ type: AddCurrenciesResponseDto })
  @Expose()
  @Type(() => AddCurrenciesResponseDto)
  data!: AddCurrenciesResponseDto;
}
