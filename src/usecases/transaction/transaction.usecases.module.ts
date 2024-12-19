import { Module, Provider } from '@nestjs/common';

import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

import { CreateTransactionUseCases } from './create-transaction.usecases';

const usecases = [CreateTransactionUseCases] satisfies Provider[];

@Module({
  imports: [RepositoriesModule],
  providers: usecases,
  exports: usecases,
})
export class TransactionUseCasesModule {}
