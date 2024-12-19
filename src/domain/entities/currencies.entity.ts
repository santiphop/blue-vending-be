import { config } from 'dotenv';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Machine } from './machines.entity';

config();
export const COINS = (process.env.COINS ?? '')
  .split(',')
  .map((el) => parseInt(el));
export const BANKNOTES = (process.env.BANKNOTES ?? '')
  .split(',')
  .map((el) => parseInt(el));

export enum FormOfCurrency {
  COIN = 'COIN',
  BANKNOTE = 'BANKNOTE',
}

@Entity({ name: 'currencies', schema: 'public' })
export class Currency extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id!: string;

  @ManyToOne(() => Machine, (machine) => machine.currencies)
  machine!: Machine;

  @Column({
    type: 'int',
    name: 'form',
    nullable: false,
  })
  form!: FormOfCurrency;

  @Column({
    type: 'int',
    name: 'value',
    nullable: false,
  })
  value!: number;

  @Column({
    type: 'int',
    name: 'quantity',
    nullable: false,
  })
  quantity!: number;

  constructor(partial: Partial<Currency> = {}) {
    super(partial);
    Object.assign(this, partial);
  }
}

export type CurrencyCreation = Pick<
  Currency,
  'machine' | 'form' | 'value' | 'quantity'
>;

export type CurrencyIncrementation = Pick<Currency, 'value' | 'quantity'>;
