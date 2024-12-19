import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Inventory } from './inventories.entity';
import { Transaction } from './transactions.entity';
import { Currency } from './currencies.entity';

@Entity({ name: 'machines', schema: 'public' })
export class Machine extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id!: string;

  @Column({
    type: 'text',
    name: 'location',
    nullable: false,
  })
  location!: string;

  @Column({
    type: 'boolean',
    name: 'is_active',
    default: true,
  })
  isActive!: boolean;

  @Column({
    type: 'date',
    name: 'last_date_of_maintainance',
    nullable: true,
    comment: 'machines text in markdown',
  })
  lastDateOfMaintainance!: Date | null;

  @OneToMany(() => Inventory, (inventory) => inventory.machine)
  inventories?: Inventory[];

  @OneToMany(() => Transaction, (transaction) => transaction.product)
  transactions?: Transaction[];

  @OneToMany(() => Currency, (currency) => currency.machine)
  currencies?: Currency[];

  constructor(partial: Partial<Machine> = {}) {
    super(partial);
    Object.assign(this, partial);
  }
}

export type MachineCreation = Pick<Machine, 'location' | 'isActive'>;
