import { Injectable, NotFoundException } from '@nestjs/common';
import { AddCurrenciesRequestDto } from 'src/controllers/v1/currencies/dtos/add-currencies.request';

import { CurrenciesRepository } from 'src/infrastructure/repositories/currencies.repository';
import { MachinesRepository } from 'src/infrastructure/repositories/machines.repository';

@Injectable()
export class AddCurrenciesUseCases {
  constructor(
    private currenciesRepository: CurrenciesRepository,
    private machinesRepository: MachinesRepository,
  ) {}

  async addCurrencies({ machineId, currencies }: AddCurrenciesRequestDto) {
    const machine = await this.machinesRepository.findOneById(machineId);
    if (!machine) {
      throw new NotFoundException(`Machine with id "${machineId}" not found.`);
    }

    const existingValues = await this.currenciesRepository.findAllByValue(
      currencies.map((c) => c.value),
    );
    if (existingValues.length !== currencies.length) {
      throw new NotFoundException('Some values are invalid.');
    }
    await this.currenciesRepository.bulkIncrement(machineId, currencies);

    const refetchedCurrencies =
      await this.currenciesRepository.findAllByMachineId(machine.id);

    return {
      machine,
      currencies: refetchedCurrencies,
    };
  }
}
