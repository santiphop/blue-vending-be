import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTransactionRequestDto } from './dtos/create-transaction.request';
import { CreateTransactionUseCases } from 'src/usecases/transaction/create-transaction.usecases';
import { SerializeResponse } from 'src/infrastructure/interceptors/serialize-response.interceptor';
import { DataWrapperCreateTransactionResponseDto } from './dtos/create-transaction.response';

@ApiTags('Transactions')
@Controller({ path: 'transactions', version: '1' })
export class TransactionsController {
  constructor(private createTransactionUseCases: CreateTransactionUseCases) {}

  @Post('/cash')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    description: 'Pay by cash',
    status: HttpStatus.CREATED,
    type: DataWrapperCreateTransactionResponseDto,
  })
  @SerializeResponse(DataWrapperCreateTransactionResponseDto)
  async createCashTransaction(@Body() requestDto: CreateTransactionRequestDto) {
    const changes =
      await this.createTransactionUseCases.createCashTransaction(requestDto);

    return {
      success: true,
      data: {
        changes,
      },
    };
  }
}
