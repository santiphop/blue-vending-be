import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  Inventory,
  InventoryCreation,
  InventoryUpdation,
} from 'src/domain/entities/inventories.entity';

@Injectable()
export class InventoriesRepository {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoriesRepository: Repository<Inventory>,
  ) {}

  create(params: InventoryCreation): Promise<Inventory> {
    const newProductEntity = this.inventoriesRepository.create(params);
    return this.inventoriesRepository.save(newProductEntity);
  }

  bulkUpdate(params: InventoryUpdation[]): Promise<Inventory[]> {
    return this.inventoriesRepository.save(params);
  }

  findOneById(id: string): Promise<Inventory | null> {
    return this.inventoriesRepository.findOne({
      where: { id },
      relations: ['product', 'machine'],
    });
  }

  findAll({
    machineId,
    ids,
  }: {
    machineId: string;
    ids: string[];
  }): Promise<Inventory[]> {
    const query = this.inventoriesRepository.createQueryBuilder('inventory');
    query.where('inventory.id IN (:...ids)', { ids });
    query.andWhere('inventory.machine_id = :machineId', { machineId });
    return query.getMany();
  }

  async findAllByMachineId(machineId: string): Promise<Inventory[]> {
    const inventories = await this.inventoriesRepository.find({
      where: { machine: { id: machineId } },
      relations: ['product'],
    });
    return inventories.map(
      (inventory) =>
        new Inventory({
          ...inventory,
          price: inventory.price ?? inventory.product!.price,
        }),
    );
  }
}
