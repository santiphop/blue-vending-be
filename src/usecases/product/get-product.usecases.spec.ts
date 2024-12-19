import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Product } from 'src/domain/entities/products.entity';

import { ProductsRepository } from 'src/infrastructure/repositories/products.repository';

import { GetProductUseCases } from './get-product.usecases';

describe('GetProductUseCase', () => {
  let getProductUseCase: GetProductUseCases;
  let productsRepository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProductUseCases,
        {
          provide: ProductsRepository,
          useValue: {
            findOneById: jest.fn(),
            findAllByCategory: jest.fn(),
          },
        },
      ],
    }).compile();

    getProductUseCase = module.get<GetProductUseCases>(GetProductUseCases);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  describe('getProduct', () => {
    it('should return a product if found', async () => {
      const product: Product = new Product({
        id: '1',
        category: 'GENERIC_PRODUCT',
        nameEn: 'Test Product',
        nameLocal: 'Test Product Local',
        detailEn: 'Test detail in English',
        detailLocal: 'Test detail in Local',
      });
      jest.spyOn(productsRepository, 'findOneById').mockResolvedValue(product);

      const result = await getProductUseCase.getProduct('1');
      expect(result).toEqual(product);
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(productsRepository, 'findOneById').mockResolvedValue(null);

      await expect(getProductUseCase.getProduct('1')).rejects.toThrow(
        new NotFoundException('Product with id "1" not found.'),
      );
    });
  });

  describe('getProducts', () => {
    it('should return products if found', async () => {
      const product: Product = new Product({
        id: '1',
        category: 'GENERIC',
        nameEn: 'Test Product',
        nameLocal: 'Test Product Local',
        detailEn: 'Test detail in English',
        detailLocal: 'Test detail in Local',
      });
      jest
        .spyOn(productsRepository, 'findAllByCategory')
        .mockResolvedValue([product]);

      const result = await getProductUseCase.getAllProducts('GENERIC');
      expect(result).toEqual([product]);
    });

    it('should return empty if not found', async () => {
      jest.spyOn(productsRepository, 'findAllByCategory').mockResolvedValue([]);

      const result = await getProductUseCase.getAllProducts('GENERIC');
      expect(result).toEqual([]);
    });
  });
});
