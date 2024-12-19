import { Brackets, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  Currency,
  CurrencyCreation,
  CurrencyIncrementation,
} from 'src/domain/entities/currencies.entity';

interface IncrementationParams {
  machineId: string;
  value: number;
  quantity: number;
}

@Injectable()
export class CurrenciesRepository {
  constructor(
    @InjectRepository(Currency)
    private readonly currenciesRepository: Repository<Currency>,
  ) {}

  bulkCreate(params: CurrencyCreation[]): Promise<Currency[]> {
    const currencies = this.currenciesRepository.create(params);
    return this.currenciesRepository.save(currencies);
  }

  async bulkIncrement(machineId: string, params: CurrencyIncrementation[]) {
    for (const { value, quantity } of params) {
      await this.increment({ machineId, value, quantity });
    }
  }

  async bulkDecrement(machineId: string, params: CurrencyIncrementation[]) {
    for (const { value, quantity } of params) {
      await this.decrement({ machineId, value, quantity });
    }
  }

  private async increment({
    machineId,
    quantity,
    value,
  }: IncrementationParams) {
    this.currenciesRepository
      .createQueryBuilder()
      .update(Currency)
      .set({ quantity: () => `quantity + ${quantity}` })
      .where('"value" = :value AND "machine_id" = :machineId', {
        value: value,
        machineId,
      })
      .execute();
  }

  private async decrement({
    machineId,
    quantity,
    value,
  }: IncrementationParams) {
    this.currenciesRepository
      .createQueryBuilder()
      .update(Currency)
      .set({ quantity: () => `quantity - ${quantity}` })
      .where('"value" = :value AND "machine_id" = :machineId', {
        value: value,
        machineId,
      })
      .execute();
  }

  findAllByValue(values: number[]): Promise<Currency[]> {
    const query = this.currenciesRepository.createQueryBuilder('currency');
    query.where('currency.value IN (:...values)', { values });
    return query.getMany();
  }

  findAllByValueAndQuantity(
    params: CurrencyIncrementation[],
  ): Promise<Currency[]> {
    const query = this.currenciesRepository.createQueryBuilder('currency');
    params.forEach(({ quantity, value }, index) => {
      query.orWhere(
        new Brackets((qb) => {
          qb.andWhere(`currency.value = :value_${index}`, {
            [`value_${index}`]: value,
          });
          qb.andWhere(`currency.quantity > :quantity_${index}`, {
            [`quantity_${index}`]: quantity,
          });
        }),
      );
    });
    return query.getMany();
  }

  findAllByMachineId(machineId: string): Promise<Currency[]> {
    return this.currenciesRepository.find({
      where: { machine: { id: machineId } },
    });
  }
}
