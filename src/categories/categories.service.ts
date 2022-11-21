import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './entities';
import { User } from '../users/entities';
import { ErrorHandlerService } from '../common/services/error-handler/error-handler.service';
import { CreateSlugService } from '../common/services/create-slug';

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

  async findAll(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepostiry.find();

      return categories;
    } catch (error) {
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
