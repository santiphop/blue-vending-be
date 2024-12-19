import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateInventoriesRequestDto } from 'src/controllers/v1/inventories/dtos/update-inventories.request';
import { Inventory } from 'src/domain/entities/inventories.entity';

import { InventoriesRepository } from 'src/infrastructure/repositories/inventories.repository';
import { MachinesRepository } from 'src/infrastructure/repositories/machines.repository';

@Injectable()
export class UpdateInventoriesUseCases {
  constructor(
    private inventoriesRepository: InventoriesRepository,
    private machinesRepository: MachinesRepository,
  ) {}

  async updateInventories({
    machineId,
    inventories,
  }: UpdateInventoriesRequestDto): Promise<Inventory[]> {
    const machine = await this.machinesRepository.findOneById(machineId);
    if (!machine) {
      throw new NotFoundException(`Machine with id "${machineId}" not found.`);
    }

    const existingInventories = await this.inventoriesRepository.findAll({
      machineId,
      ids: inventories.map((inventory) => inventory.id),
    });
    if (existingInventories.length !== inventories.length) {
      throw new NotFoundException('Some inventory IDs are invalid.');
    }

    return this.inventoriesRepository.bulkUpdate(
      inventories.map((inventory) => new Inventory(inventory)),
    );
  }
}
