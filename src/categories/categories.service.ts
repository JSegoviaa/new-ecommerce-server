import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './entities';
import { User } from '../users/entities';
import { ErrorHandlerService } from '../common/services/error-handler/error-handler.service';
import { CreateSlugService } from '../common/services/create-slug';
import { QueryDto } from '../common/dtos/pagination.dto';
import { Categories } from './interfaces';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepostiry: Repository<Category>,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly createSlugService: CreateSlugService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    try {
      const newCategory = this.categoryRepostiry.create({
        ...createCategoryDto,
        createdBy: user,
        updatedBy: user,
        slug: this.createSlugService.createSlug(createCategoryDto.title),
      });

      return await this.categoryRepostiry.save(newCategory);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findAll(queryDto: QueryDto): Promise<Categories> {
    const { limit = 10, offset = 0, sort = 'ASC', order = 'id' } = queryDto;

    try {
      const [categories, total] = await Promise.all([
        this.categoryRepostiry.find({
          take: limit,
          skip: offset,
          order: { [order]: sort },
        }),
        this.categoryRepostiry.count(),
      ]);

      return { total, categories };
    } catch (error) {
      console.log({ error });
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepostiry.findOneBy({ id });

      if (!category) {
        throw new NotFoundException(
          `Category with that id ${id} doest not exist`,
        );
      }

      return category;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    user: User,
  ): Promise<Category> {
    try {
      await this.findOne(id);

      const category = await this.categoryRepostiry.preload({
        id,
        ...updateCategoryDto,
      });

      category.updatedBy = user;
      category.updatedAt = dayjs().format();

      return await this.categoryRepostiry.save(category);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async remove(id: number): Promise<Category> {
    try {
      const category = await this.findOne(id);

      await this.categoryRepostiry.remove(category);

      return { ...category, id };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
