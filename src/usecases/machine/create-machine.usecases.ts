import { Injectable } from '@nestjs/common';
import { CreateMachineRequestDto } from 'src/controllers/v1/machines/dtos/create-machine.request';
import {
  BANKNOTES,
  COINS,
  Currency,
  FormOfCurrency,
} from 'src/domain/entities/currencies.entity';
import { CurrenciesRepository } from 'src/infrastructure/repositories/currencies.repository';

import { MachinesRepository } from 'src/infrastructure/repositories/machines.repository';

@Injectable()
export class CreateMachineUseCases {
  constructor(
    private machinesRepository: MachinesRepository,
    private currenciesRepository: CurrenciesRepository,
  ) {}

  async createMachine(params: CreateMachineRequestDto) {
    const machine = await this.machinesRepository.create(params);
    await this.currenciesRepository.bulkCreate([
      ...COINS.map(
        (value) => new Currency({ machine, value, form: FormOfCurrency.COIN }),
      ),
      ...BANKNOTES.map(
        (value) =>
          new Currency({ machine, value, form: FormOfCurrency.BANKNOTE }),
      ),
    ]);

    return machine;
  }
}
