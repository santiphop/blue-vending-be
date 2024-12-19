import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from './base.entity';
import { Machine } from './machines.entity';
import { Product } from './products.entity';

@Entity({ name: 'inventories', schema: 'public' })
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id!: string;

  @ManyToOne(() => Machine, (machine) => machine.inventories)
  @JoinColumn({ name: 'machine_id' })
  machine?: Machine;

  @ManyToOne(() => Product, (product) => product.inventories)
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @Column({
    type: 'int',
    name: 'item_number',
    nullable: true,
  })
  itemNumber!: number | null;

  @Column({
    type: 'int',
    name: 'quantity',
    nullable: false,
  })
  quantity!: number;

  @Column({
    type: 'decimal',
    name: 'price',
    nullable: true,
    comment: 'override product price',
  })
  price!: string | null;

  constructor(partial: Partial<Inventory> = {}) {
    super(partial);
    Object.assign(this, partial);
  }
}

export type InventoryCreation = Pick<
  Inventory,
  'machine' | 'product' | 'quantity' | 'price'
>;

export type InventoryUpdation = Pick<
  Inventory,
  'id' | 'machine' | 'product' | 'quantity' | 'price'
>;
