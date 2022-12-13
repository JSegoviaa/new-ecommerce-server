import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as dayjs from 'dayjs';

import { CreateSubcategoryDto, UpdateSubcategoryDto } from './dto';
import { Subcategory } from './entities';
import { ErrorHandlerService } from '../common/services/error-handler/error-handler.service';
import { CreateSlugService } from '../common/services/create-slug/create-slug.service';
import { User } from '../users/entities/user.entity';
import { QueryDto } from '../common/dtos/pagination.dto';
import { Subcategories } from './interfaces';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly createSlugService: CreateSlugService,
  ) {}

  async create(
    createSubcategoryDto: CreateSubcategoryDto,
    user: User,
  ): Promise<Subcategory> {
    try {
      const newSubcategory = this.subcategoryRepository.create({
        ...createSubcategoryDto,
        createdBy: user,
        updatedBy: user,
        slug: this.createSlugService.createSlug(createSubcategoryDto.title),
      });

      return await this.subcategoryRepository.save(newSubcategory);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findAll(queryDto: QueryDto): Promise<Subcategories> {
    const { limit = 10, offset = 0, sort = 'ASC', order = 'id' } = queryDto;

    try {
      const [subcategories, total] = await Promise.all([
        this.subcategoryRepository.find({
          take: limit,
          skip: offset,
          order: { [order]: sort },
        }),
        this.subcategoryRepository.count(),
      ]);

      subcategories.forEach((sub) => {
        delete sub.createdBy;
        delete sub.updatedBy;
        delete sub.category.createdBy;
        delete sub.category.updatedBy;
        delete sub.category.createdAt;
        delete sub.category.updatedAt;
        delete sub.category.id;
        delete sub.category.image;
        delete sub.category.isActive;
        delete sub.category.isPublished;
      });

      return { total, subcategories };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findOne(id: number): Promise<Subcategory> {
    try {
      const subcategory = await this.subcategoryRepository.findOneBy({ id });

      if (!subcategory) {
        throw new NotFoundException(
          `Category with that id ${id} doest not exist`,
        );
      }

      return subcategory;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async update(
    id: number,
    updateSubcategoryDto: UpdateSubcategoryDto,
    user: User,
  ): Promise<Subcategory> {
    try {
      await this.findOne(id);

      const category = await this.subcategoryRepository.preload({
        id,
        ...updateSubcategoryDto,
      });

      category.updatedBy = user;
      category.updatedAt = dayjs().format();

      return await this.subcategoryRepository.save(category);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async remove(id: number): Promise<Subcategory> {
    try {
      const category = await this.findOne(id);

      await this.subcategoryRepository.remove(category);

      return { ...category, id };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findByIds(id: Subcategory[]) {
    try {
      const subcategories = await this.subcategoryRepository.findBy({
        id: In(id),
      });

      return subcategories;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
