import { Expose, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { Product } from 'src/domain/entities/products.entity';

class ProductDto implements Partial<Product> {
  @ApiProperty({
    type: 'string',
    nullable: false,
  })
  @Expose()
  id!: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
  })
  @Expose()
  nameEn!: string;

  @ApiProperty({
    type: 'string',
    nullable: false,
  })
  @Expose()
  nameLocal!: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @Expose()
  detailEn!: string | null;

  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @Expose()
  detailLocal!: string | null;

  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @Expose()
  category!: string | null;
}

export class GetProductsResponseDto {
  @ApiProperty({ type: [ProductDto] })
  @Expose()
  @Type(() => ProductDto)
  data!: Product[];
}
