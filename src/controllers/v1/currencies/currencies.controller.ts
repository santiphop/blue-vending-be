import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SerializeResponse } from 'src/infrastructure/interceptors/serialize-response.interceptor';

import {
  AddCurrenciesResponseDto,
  DataWrapperAddCurrenciesResponseDto,
} from './dtos/add-currencies.response';
import { AddCurrenciesRequestDto } from './dtos/add-currencies.request';
import { AddCurrenciesUseCases } from 'src/usecases/currency/add-currencies.usecases';

@ApiTags('Currencies')
@Controller({ path: 'currencies', version: '1' })
export class CurrenciesController {
  constructor(private addCurrenciesUseCases: AddCurrenciesUseCases) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    description: 'Add Currency',
    status: HttpStatus.CREATED,
    type: DataWrapperAddCurrenciesResponseDto,
  })
  @SerializeResponse(DataWrapperAddCurrenciesResponseDto)
  async addCurrency(
    @Body() requestDto: AddCurrenciesRequestDto,
  ): Promise<{ data: AddCurrenciesResponseDto }> {
    return {
      data: await this.addCurrenciesUseCases.addCurrencies(requestDto),
    };
  }
}
