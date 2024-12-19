import { Injectable, NotFoundException } from '@nestjs/common';

import { MachinesRepository } from 'src/infrastructure/repositories/machines.repository';

@Injectable()
export class MaintainMachineUseCases {
  constructor(private machinesRepository: MachinesRepository) {}

  async startMaintainMachine(id: string) {
    const machine = await this.machinesRepository.findOneById(id);
    if (!machine) {
      throw new NotFoundException(`Machine with id "${id}" not found.`);
    }

    return this.machinesRepository.deactivate(machine);
  }

  async finishMaintainMachine(id: string) {
    const machine = await this.machinesRepository.findOneById(id);
    if (!machine) {
      throw new NotFoundException(`Machine with id "${id}" not found.`);
    }

    return this.machinesRepository.activate(machine);
  }
}
