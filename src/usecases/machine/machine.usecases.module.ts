import { Module, Provider } from '@nestjs/common';

import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';

import { CreateMachineUseCases } from './create-machine.usecases';
import { MaintainMachineUseCases } from './maintain-machine.usecases';

const usecases = [
  CreateMachineUseCases,
  MaintainMachineUseCases,
] satisfies Provider[];

@Module({
  imports: [RepositoriesModule],
  providers: usecases,
  exports: usecases,
})
export class MachineUseCasesModule {}
