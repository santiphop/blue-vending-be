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

export enum PaymentMethod {
  CASH = 'CASH',
}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity({ name: 'transactions', schema: 'public' })
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id!: string;

  @ManyToOne(() => Machine, (machine) => machine.transactions)
  @JoinColumn({ name: 'machine_id' })
  machine?: Machine;

  @ManyToOne(() => Product, (product) => product.transactions)
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    name: 'payment_method',
    nullable: false,
  })
  paymentMethod!: string;

  @Column({
    type: 'decimal',
    name: 'amount',
    nullable: true,
  })
  amount!: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    name: 'status',
    nullable: false,
  })
  status!: string;

  constructor(partial: Partial<Transaction> = {}) {
    super(partial);
    Object.assign(this, partial);
  }
}

export type TransactionCreation = Pick<
  Transaction,
  'machine' | 'product' | 'paymentMethod' | 'amount' | 'status'
>;
