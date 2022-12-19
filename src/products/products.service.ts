import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import { User } from '../users/entities';
import { ErrorHandlerService } from '../common/services/error-handler';
import { CreateSlugService } from '../common/services/create-slug';
import { QueryDto } from '../common/dtos';
import { Products } from './interfaces';
import { SubcategoriesService } from '../subcategories/subcategories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly createSlugService: CreateSlugService,
    private readonly subcategoryService: SubcategoriesService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    try {
      const subs = await this.subcategoryService.findByIds(
        createProductDto.subcategory,
      );

      const newProduct = this.productRepository.create({
        ...createProductDto,
        slug: this.createSlugService.createSlug(createProductDto.title),
        createdBy: user,
        updatedBy: user,
        subcategory: subs,
      });

      return this.productRepository.save(newProduct);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findAll(queryDto: QueryDto): Promise<Products> {
    const { limit = 10, offset = 0, order = 'id', sort = 'ASC' } = queryDto;

    try {
      const [products, total] = await Promise.all([
        this.productRepository.find({
          take: limit,
          skip: offset,
          order: { [order]: sort },
        }),
        this.productRepository.count(),
      ]);

      products.forEach((product) => {
        delete product.createdBy;
        delete product.updatedBy;
        delete product.description;
        delete product.discount;
        delete product.subcategory;
      });

      return { total, products };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} does not exist`);
      }

      return product;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      await this.findOne(id);

      const subs = await this.subcategoryService.findByIds(
        updateProductDto.subcategory,
      );

      const updatedProduct = await this.productRepository.preload({
        id,
        ...updateProductDto,
        subcategory: subs,
      });

      return this.productRepository.save(updatedProduct);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      const product = await this.findOne(id);

      await this.productRepository.remove(product);

      return { id, ...product };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
