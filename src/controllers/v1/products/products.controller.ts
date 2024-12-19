import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SerializeResponse } from 'src/infrastructure/interceptors/serialize-response.interceptor';

// import { CreateProductUseCases } from 'src/usecases/product/create-product.usecases';
import { GetProductUseCases } from 'src/usecases/product/get-product.usecases';

import { GetProductsQueryParamDto } from './dtos/get-products.request';
import { GetProductsResponseDto } from './dtos/get-products.response';
import { GetProductPathParamDto } from './dtos/get-product.request';
import { GetProductResponseDto } from './dtos/get-product.response';

@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class ProductsController {
  constructor(
    // private createProductUseCases: CreateProductUseCases,
    private getProductUseCases: GetProductUseCases,
  ) {}

  // @Post('/')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiResponse({
  //   description: 'Create Product',
  //   status: HttpStatus.CREATED,
  //   type: CreateProductsResponseDto,
  // })
  // @SerializeResponse(CreateProductsResponseDto)
  // async createProduct(
  //   @Body() requestDto: CreateProductRequestDto,
  // ): Promise<{ data: Product }> {
  //   return {
  //     data: await this.createProductUseCases.createProduct(requestDto),
  //   };
  // }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Product ID',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Get one product by ID',
    status: HttpStatus.OK,
    type: GetProductResponseDto,
  })
  @SerializeResponse(GetProductResponseDto)
  async getProduct(
    @Param() param: GetProductPathParamDto,
  ): Promise<GetProductResponseDto> {
    return {
      data: await this.getProductUseCases.getProduct(param.id),
    };
  }

  @Get('/')
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter product by category',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Get many products',
    status: HttpStatus.OK,
    type: GetProductsResponseDto,
  })
  @SerializeResponse(GetProductsResponseDto)
  async getProducts(
    @Query() query: GetProductsQueryParamDto,
  ): Promise<GetProductsResponseDto> {
    return {
      data: await this.getProductUseCases.getAllProducts(query.category),
    };
  }
}
