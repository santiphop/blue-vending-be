import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product, ProductCreation } from 'src/domain/entities/products.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  findOneById(id: string): Promise<Product | null> {
    return this.productsRepository.findOne({
      where: { id },
    });
  }

  findAllByCategory(category?: string): Promise<Product[]> {
    const query = this.productsRepository.createQueryBuilder('product');
    this.addCategoryFilter(query, category);

    return query.getMany();
  }

  private addCategoryFilter(
    query: SelectQueryBuilder<Product>,
    category?: string,
  ): void {
    if (category === undefined) return;

    query.andWhere('product.category ILIKE :category', { category });
  }

  findAll(options?: FindManyOptions<Product>): Promise<Product[]> {
    return this.productsRepository.find(options);
  }

  create(productData: ProductCreation): Promise<Product> {
    const newProductEntity = this.productsRepository.create(productData);
    return this.productsRepository.save(newProductEntity);
  }

  update(id: string, productData: ProductCreation): Promise<Product> {
    return this.productsRepository.save({ ...productData, id });
  }

  delete(id: string): Promise<Product> {
    return this.productsRepository.softRemove({ id });
  }
}
