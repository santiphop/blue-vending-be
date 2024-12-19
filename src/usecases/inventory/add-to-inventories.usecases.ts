import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToInventoriesRequestDto } from 'src/controllers/v1/inventories/dtos/add-to-inventories.request';
import { Inventory } from 'src/domain/entities/inventories.entity';

import { InventoriesRepository } from 'src/infrastructure/repositories/inventories.repository';
import { MachinesRepository } from 'src/infrastructure/repositories/machines.repository';
import { ProductsRepository } from 'src/infrastructure/repositories/products.repository';

@Injectable()
export class AddToInventoriesUseCases {
  constructor(
    private inventoriesRepository: InventoriesRepository,
    private machinesRepository: MachinesRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async addToInventories(
    params: AddToInventoriesRequestDto,
  ): Promise<Inventory> {
    const { machineId, productId, quantity, price } = params;
    const machine = await this.machinesRepository.findOneById(machineId);
    if (!machine) {
      throw new NotFoundException(`Machine with id "${machineId}" not found.`);
    }

    const product = await this.productsRepository.findOneById(productId);
    if (!product) {
      throw new NotFoundException(`Product with id "${productId}" not found.`);
    }

    return this.inventoriesRepository.create({
      product,
      machine,
      quantity,
      price: price?.toString() ?? null,
    });
  }
}
