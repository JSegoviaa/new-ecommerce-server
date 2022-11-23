import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ErrorHandlerService } from '../../common/services/error-handler';
import { CreateVariantColorDto, UpdateVariantColorDto } from './dto';
import { VariantColor } from './entities';
import { QueryDto } from '../../common/dtos/pagination.dto';
import { VariantColors } from './interfaces';

@Injectable()
export class VariantColorsService {
  constructor(
    @InjectRepository(VariantColor)
    private readonly variantColorRepository: Repository<VariantColor>,
    private readonly errorhandlerService: ErrorHandlerService,
  ) {}

  async create(createVariantDto: CreateVariantColorDto): Promise<VariantColor> {
    try {
      const variantColor = this.variantColorRepository.create({
        ...createVariantDto,
      });

      return await this.variantColorRepository.save(variantColor);
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }

  async findAll(queryDto: QueryDto): Promise<VariantColors> {
    const { limit = 10, offset = 0, order = 'id', sort = 'ASC' } = queryDto;

    try {
      const [variantColors, total] = await Promise.all([
        this.variantColorRepository.find({
          take: limit,
          skip: offset,
          order: { [order]: sort },
        }),
        this.variantColorRepository.count(),
      ]);
      return { total, variantColors };
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }

  async findOne(id: number): Promise<VariantColor> {
    try {
      const variantCoor = await this.variantColorRepository.findOneBy({ id });

      if (!variantCoor) {
        throw new NotFoundException(
          `Variant Color with id ${id} doest not exist`,
        );
      }

      return variantCoor;
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }

  async update(
    id: number,
    updateVariantDto: UpdateVariantColorDto,
  ): Promise<VariantColor> {
    try {
      await this.findOne(id);

      const updatedVariantColor = await this.variantColorRepository.preload({
        id,
        ...updateVariantDto,
      });

      return await this.variantColorRepository.save(updatedVariantColor);
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }

  async remove(id: number): Promise<VariantColor> {
    try {
      const variantColor = await this.findOne(id);

      await this.variantColorRepository.remove(variantColor);

      return { id, ...variantColor };
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }
}
