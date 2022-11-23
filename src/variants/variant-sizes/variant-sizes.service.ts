import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVariantSizeDto, UpdateVariantSizeDto } from './dto';
import { VariantSize } from './entities';
import { ErrorHandlerService } from '../../common/services/error-handler';
import { QueryDto } from '../../common/dtos/pagination.dto';
import { VariantSizes } from './interfaces';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(VariantSize)
    private readonly variantSizesRepository: Repository<VariantSize>,
    private readonly errorhandlerService: ErrorHandlerService,
  ) {}

  async create(createVariantDto: CreateVariantSizeDto): Promise<VariantSize> {
    try {
      const variantSize = this.variantSizesRepository.create({
        ...createVariantDto,
      });

      return await this.variantSizesRepository.save(variantSize);
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }

  async findAll(queryDto: QueryDto): Promise<VariantSizes> {
    const { limit = 10, offset = 0, order = 'id', sort = 'ASC' } = queryDto;

    try {
      const [variantSizes, total] = await Promise.all([
        this.variantSizesRepository.find({
          take: limit,
          skip: offset,
          order: { [order]: sort },
        }),
        this.variantSizesRepository.count(),
      ]);
      return { total, variantSizes };
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }

  async findOne(id: number): Promise<VariantSize> {
    try {
      const variantSize = await this.variantSizesRepository.findOneBy({ id });

      if (!variantSize) {
        throw new NotFoundException(
          `Variant Size with id ${id} doest not exist`,
        );
      }

      return variantSize;
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }

  async update(
    id: number,
    updateVariantDto: UpdateVariantSizeDto,
  ): Promise<VariantSize> {
    try {
      await this.findOne(id);

      const updatedVariantSize = await this.variantSizesRepository.preload({
        id,
        ...updateVariantDto,
      });

      return await this.variantSizesRepository.save(updatedVariantSize);
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }

  async remove(id: number): Promise<VariantSize> {
    try {
      const variantSize = await this.findOne(id);

      await this.variantSizesRepository.remove(variantSize);

      return { id, ...variantSize };
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }
}
