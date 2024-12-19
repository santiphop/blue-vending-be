import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Inventory } from './inventories.entity';
import { Transaction } from './transactions.entity';

@Entity({ name: 'products', schema: 'public' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id!: string;

  @Column({
    type: 'text',
    name: 'name_en',
    nullable: false,
  })
  nameEn!: string;

  @Column({
    type: 'text',
    name: 'name_local',
    nullable: false,
  })
  nameLocal!: string;

  @Column({
    type: 'text',
    name: 'detail_en',
    nullable: true,
    comment: 'products text in markdown',
  })
  detailEn!: string | null;

  @Column({
    type: 'text',
    name: 'detail_local',
    nullable: true,
    comment: 'products text in markdown',
  })
  detailLocal!: string | null;

  @Column({
    type: 'text',
    name: 'category',
    nullable: true,
  })
  category!: string | null;

  @Column({
    type: 'decimal',
    name: 'price',
    nullable: false,
  })
  price!: string;

  @Column({
    type: 'boolean',
    name: 'is_enabled',
    default: true,
  })
  isEnabled!: boolean;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories?: Inventory[];

  @OneToMany(() => Transaction, (transaction) => transaction.product)
  transactions?: Transaction[];

  constructor(partial: Partial<Product> = {}) {
    super(partial);
    Object.assign(this, partial);
  }
}

export type ProductCreation = Pick<
  Product,
  'nameEn' | 'nameLocal' | 'detailEn' | 'detailLocal' | 'price'
>;
