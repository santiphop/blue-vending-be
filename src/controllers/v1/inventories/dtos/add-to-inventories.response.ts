import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Inventory } from 'src/domain/entities/inventories.entity';
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

  @ApiProperty({
    type: 'string',
    nullable: false,
  })
  @Expose()
  price!: string;
}

class InventoryDto implements Partial<Inventory> {
  @ApiProperty({ type: ProductDto })
  @Expose()
  @Type(() => ProductDto)
  product?: Product;

  @ApiProperty()
  @Expose()
  price!: string;

  @ApiProperty()
  @Expose()
  quantity!: number;
}

export class AddToInventoriesResponseDto {
  @ApiProperty({ type: InventoryDto })
  @Expose()
  @Type(() => InventoryDto)
  data!: InventoryDto;
}
