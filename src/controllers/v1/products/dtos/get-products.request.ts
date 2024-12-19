import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Trim } from 'src/controllers/decorators/trim.transformer';

export class GetProductsQueryParamDto {
  @ApiProperty({
    description: 'Product category',
    required: false,
  })
  @IsString()
  @Trim()
  @IsOptional()
  category?: string;
}
