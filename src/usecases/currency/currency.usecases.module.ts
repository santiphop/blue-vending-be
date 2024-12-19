import { Module, Provider } from '@nestjs/common';

import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

import { AddCurrenciesUseCases } from './add-currencies.usecases';

const usecases = [AddCurrenciesUseCases] satisfies Provider[];

@Module({
  imports: [RepositoriesModule],
  providers: usecases,
  exports: usecases,
})
export class CurrencyUseCasesModule {}
