import { Module } from '@nestjs/common';

import { ProductUseCasesModule } from 'src/usecases/product/product.usecases.module';

import { ProductsController } from './products/products.controller';
import { MachinesController } from './machines/machines.controller';
import { MachineUseCasesModule } from 'src/usecases/machine/machine.usecases.module';
import { CurrenciesController } from './currencies/currencies.controller';
import { CurrencyUseCasesModule } from 'src/usecases/currency/currency.usecases.module';
import { InventoryUseCasesModule } from 'src/usecases/inventory/inventory.usecases.module';
import { InventoriesController } from './inventories/inventories.controller';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionUseCasesModule } from 'src/usecases/transaction/transaction.usecases.module';

@Module({
  imports: [
    ProductUseCasesModule,
    MachineUseCasesModule,
    CurrencyUseCasesModule,
    InventoryUseCasesModule,
    TransactionUseCasesModule,
  ],
  controllers: [
    ProductsController,
    MachinesController,
    CurrenciesController,
    InventoriesController,
    TransactionsController,
  ],
})
export class ControllerV1 {}
