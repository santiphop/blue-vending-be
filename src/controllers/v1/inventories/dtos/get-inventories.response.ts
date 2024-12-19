import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Inventory } from 'src/domain/entities/inventories.entity';
import { Machine } from 'src/domain/entities/machines.entity';
import { Product } from 'src/domain/entities/products.entity';

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
  id!: string;

  @ApiProperty()
  @Expose()
  itemNumber!: number | null;

  @ApiProperty()
  @Expose()
  price!: string | null;

  @ApiProperty()
  @Expose()
  quantity!: number;
}

export class GetInventoriesResponseDto {
  @ApiProperty({ type: MachineDto })
  @Expose()
  @Type(() => MachineDto)
  machine!: Machine;

  @ApiProperty({ type: InventoryDto })
  @Expose()
  @Type(() => InventoryDto)
  inventories!: InventoryDto[];
}

export class DataWrapperGetInventoriesResponseDto {
  @ApiProperty({ type: GetInventoriesResponseDto })
  @Expose()
  @Type(() => GetInventoriesResponseDto)
  data!: GetInventoriesResponseDto;
}
