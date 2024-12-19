import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from 'src/domain/entities/products.entity';

import { ProductsRepository } from 'src/infrastructure/repositories/products.repository';

@Injectable()
export class GetProductUseCases {
  constructor(private productsRepository: ProductsRepository) {}

  async getProduct(id: string): Promise<Product> {
    const product = await this.productsRepository.findOneById(id);
    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found.`);
    }

    return product;
  }

  async getAllProducts(category?: string): Promise<Product[]> {
    const products = await this.productsRepository.findAllByCategory(category);
    return products;
  }
}
