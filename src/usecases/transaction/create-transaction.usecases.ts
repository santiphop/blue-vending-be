import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionRequestDto } from 'src/controllers/v1/transactions/dtos/create-transaction.request';
import { COINS } from 'src/domain/entities/currencies.entity';
import {
  PaymentMethod,
  TransactionStatus,
} from 'src/domain/entities/transactions.entity';

import { CurrenciesRepository } from 'src/infrastructure/repositories/currencies.repository';
import { InventoriesRepository } from 'src/infrastructure/repositories/inventories.repository';
import { TransactionsRepository } from 'src/infrastructure/repositories/transactions.repository';

class CurrencyDto {
  value!: number;
  quantity!: number;
}

@Injectable()
export class CreateTransactionUseCases {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private currenciesRepository: CurrenciesRepository,
    private inventoriesRepository: InventoriesRepository,
  ) {}

  async createCashTransaction({
    inventoryId,
    currencies,
    quantity,
  }: CreateTransactionRequestDto) {
    const inventory = await this.inventoriesRepository.findOneById(inventoryId);
    if (!inventory) {
      throw new NotFoundException(
        `Inventory with id "${inventoryId}" not found.`,
      );
    }

    const { machine, product } = inventory;
    const productPrice = product!.price;
    const totalPrice = parseInt(productPrice) * quantity;
    const amountPaid = this.sumOfCurrencies(currencies);
    const coinChanges = this.calculateChange(totalPrice, amountPaid);
    await this.currenciesRepository.bulkIncrement(machine!.id, currencies);

    const existingCurrencies =
      await this.currenciesRepository.findAllByValueAndQuantity(coinChanges);
    if (existingCurrencies.length !== coinChanges.length) {
      await this.currenciesRepository.bulkDecrement(machine!.id, currencies);
      await this.transactionsRepository.create({
        amount: totalPrice,
        paymentMethod: PaymentMethod.CASH,
        machine: inventory.machine,
        product: inventory.product,
        status: TransactionStatus.FAILED,
      });

      throw new BadRequestException('Not enough changes, return amount paid');
    }

    await this.currenciesRepository.bulkDecrement(machine!.id, coinChanges);
    await this.inventoriesRepository.decrement({
      inventoryId: inventory.id,
      quantity,
    });

    await this.transactionsRepository.create({
      amount: totalPrice,
      paymentMethod: PaymentMethod.CASH,
      machine: inventory.machine,
      product: inventory.product,
      status: TransactionStatus.SUCCESS,
    });

    return coinChanges;
  }

  private sumOfCurrencies(currencies: CurrencyDto[]) {
    const sum = currencies.reduce((acc, cur) => {
      return acc + cur.value * cur.quantity;
    }, 0);
    return sum;
  }

  private calculateChange(price: number, amountPaid: number) {
    const availableCoins = COINS;
    availableCoins.sort((a, b) => b - a);

    let change = amountPaid - price;
    const result = [] as CurrencyDto[];

    for (const coin of availableCoins) {
      if (coin <= change) {
        const coinQuantity = Math.floor(change / coin);
        change -= coin * coinQuantity;
        result.push({
          value: coin,
          quantity: coinQuantity,
        });
      }
    }

    return result;
  }
}
