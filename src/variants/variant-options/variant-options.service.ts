import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VariantOption } from './entities';
import { CreateVariantOptionDto, UpdateVariantOptionDto } from './dto';
import { ErrorHandlerService } from '../../common/services/error-handler';

@Injectable()
export class VariantOptionsService {
  constructor(
    @InjectRepository(VariantOption)
    private readonly variantOptionsRepository: Repository<VariantOption>,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async create(
    createVariantOptionDto: CreateVariantOptionDto,
  ): Promise<VariantOption> {
    try {
      const variantOptions = this.variantOptionsRepository.create({
        ...createVariantOptionDto,
      });

      return await this.variantOptionsRepository.save(variantOptions);
    } catch (error) {
      this.errorHandler.errorHandler(error);
    }
  }

  async findOne(id: number): Promise<VariantOption> {
    try {
      const variantOption = await this.variantOptionsRepository.findOneBy({
        id,
      });

      if (!variantOption) {
        throw new NotFoundException(
          `Variant Option with id ${id} doest not exist`,
        );
      }

      return variantOption;
    } catch (error) {
      this.errorHandler.errorHandler(error);
    }
  }

  async update(
    id: number,
    updateVariantOptionDto: UpdateVariantOptionDto,
  ): Promise<VariantOption> {
    try {
      await this.findOne(id);

      const updatedVariantOption = await this.variantOptionsRepository.preload({
        id,
        ...updateVariantOptionDto,
      });

      return await this.variantOptionsRepository.save(updatedVariantOption);
    } catch (error) {
      this.errorHandler.errorHandler(error);
    }
  }

  async remove(id: number): Promise<VariantOption> {
    try {
      const variantOption = await this.findOne(id);

      await this.variantOptionsRepository.remove(variantOption);

      return { id, ...variantOption };
    } catch (error) {
      this.errorHandler.errorHandler(error);
    }
  }
}
