import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  Transaction,
  TransactionCreation,
} from 'src/domain/entities/transactions.entity';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  create(transactionData: TransactionCreation): Promise<Transaction> {
    const newTransactionEntity =
      this.transactionsRepository.create(transactionData);
    return this.transactionsRepository.save(newTransactionEntity);
  }
}
