import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SerializeResponse } from 'src/infrastructure/interceptors/serialize-response.interceptor';
import { GetInventoriesUseCases } from 'src/usecases/inventory/get-inventories.usecases';
import {
  GetInventoriesPathParamDto,
  GetInventoriesPathQueryDto,
} from './dtos/get-inventories.request';
import {
  DataWrapperGetInventoriesResponseDto,
  GetInventoriesResponseDto,
} from './dtos/get-inventories.response';
import { AddToInventoriesRequestDto } from './dtos/add-to-inventories.request';
import { AddToInventoriesUseCases } from 'src/usecases/inventory/add-to-inventories.usecases';
import { AddToInventoriesResponseDto } from './dtos/add-to-inventories.response';
import { Inventory } from 'src/domain/entities/inventories.entity';
import { UpdateInventoriesRequestDto } from './dtos/update-inventories.request';
import { UpdateInventoriesUseCases } from 'src/usecases/inventory/update-inventories.usecases';
import {
  DataWrapperUpdateInventoriesResponseDto,
  UpdateInventoriesResponseDto,
} from './dtos/update-inventories.response';

@ApiTags('Inventories')
@Controller({ path: 'inventories', version: '1' })
export class InventoriesController {
  constructor(
    private getInventoriesUseCases: GetInventoriesUseCases,
    private addToInventoriesUseCases: AddToInventoriesUseCases,
    private updateInventoriesUseCases: UpdateInventoriesUseCases,
  ) {}

  @Get('/:machineId')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Machine ID',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Get all inventories',
    status: HttpStatus.OK,
    type: DataWrapperGetInventoriesResponseDto,
  })
  @SerializeResponse(DataWrapperGetInventoriesResponseDto)
  async getInventories(
    @Param() param: GetInventoriesPathParamDto,
    @Query() query: GetInventoriesPathQueryDto,
  ): Promise<{ data: GetInventoriesResponseDto }> {
    return {
      data: await this.getInventoriesUseCases.getInventories(
        param.machineId,
        query.itemNumber,
      ),
    };
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    description: 'Add a product to inventories',
    status: HttpStatus.CREATED,
    type: AddToInventoriesResponseDto,
  })
  @SerializeResponse(AddToInventoriesResponseDto)
  async addToInventories(
    @Body() requestDto: AddToInventoriesRequestDto,
  ): Promise<{ data: Inventory }> {
    return {
      data: await this.addToInventoriesUseCases.addToInventories(requestDto),
    };
  }

  @Patch('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Update inventories',
    status: HttpStatus.OK,
    type: DataWrapperUpdateInventoriesResponseDto,
  })
  @SerializeResponse(DataWrapperUpdateInventoriesResponseDto)
  async updateInventories(
    @Body() requestDto: UpdateInventoriesRequestDto,
  ): Promise<{ data: UpdateInventoriesResponseDto }> {
    await this.updateInventoriesUseCases.updateInventories(requestDto);
    return {
      data: await this.getInventoriesUseCases.getInventories(
        requestDto.machineId,
      ),
    };
  }
}
