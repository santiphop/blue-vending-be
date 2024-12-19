import { Injectable, NotFoundException } from '@nestjs/common';
import { Inventory } from 'src/domain/entities/inventories.entity';
import { Machine } from 'src/domain/entities/machines.entity';

import { InventoriesRepository } from 'src/infrastructure/repositories/inventories.repository';
import { MachinesRepository } from 'src/infrastructure/repositories/machines.repository';

@Injectable()
export class GetInventoriesUseCases {
  constructor(
    private inventoriesRepository: InventoriesRepository,
    private machinesRepository: MachinesRepository,
  ) {}

  async getInventories(
    machineId: string,
  ): Promise<{ machine: Machine; inventories: Inventory[] }> {
    const machine = await this.machinesRepository.findOneById(machineId);
    if (!machine) {
      throw new NotFoundException(`Machine with id "${machineId}" not found.`);
    }

    const inventories =
      await this.inventoriesRepository.findAllByMachineId(machineId);
    return {
      machine,
      inventories,
    };
  }
}
