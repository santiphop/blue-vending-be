import { Module, Provider } from '@nestjs/common';

import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

import { AddToInventoriesUseCases } from './add-to-inventories.usecases';
import { GetInventoriesUseCases } from './get-inventories.usecases';
import { UpdateInventoriesUseCases } from './update-inventories.usecases';

const usecases = [
  GetInventoriesUseCases,
  AddToInventoriesUseCases,
  UpdateInventoriesUseCases,
] satisfies Provider[];

@Module({
  imports: [RepositoriesModule],
  providers: usecases,
  exports: usecases,
})
export class InventoryUseCasesModule {}
