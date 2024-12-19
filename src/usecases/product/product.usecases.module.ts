import { Module, Provider } from '@nestjs/common';

import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

// import { CreateProductUseCases } from './create-product.usecases';
import { GetProductUseCases } from './get-product.usecases';

const usecases = [GetProductUseCases] satisfies Provider[];

@Module({
  imports: [RepositoriesModule],
  providers: usecases,
  exports: usecases,
})
export class ProductUseCasesModule {}
