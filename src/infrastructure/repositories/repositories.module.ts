import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { Product } from 'src/domain/entities/products.entity';
import { ProductsRepository } from './products.repository';
import { Machine } from 'src/domain/entities/machines.entity';
import { MachinesRepository } from './machines.repository';
import { Currency } from 'src/domain/entities/currencies.entity';
import { CurrenciesRepository } from './currencies.repository';
import { InventoriesRepository } from './inventories.repository';
import { Inventory } from 'src/domain/entities/inventories.entity';
import { Transaction } from 'src/domain/entities/transactions.entity';
import { TransactionsRepository } from './transactions.repository';

const entities = [
  Product,
  Machine,
  Currency,
  Inventory,
  Transaction,
] satisfies EntityClassOrSchema[];

const repositories = [
  ProductsRepository,
  MachinesRepository,
  CurrenciesRepository,
  InventoriesRepository,
  TransactionsRepository,
] satisfies Provider[];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: repositories,
  exports: repositories,
})
export class RepositoriesModule {}
