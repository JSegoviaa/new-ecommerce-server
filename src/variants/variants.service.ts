import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateVariantColorDto,
  CreateVariantSizeDto,
  UpdateVariantColorDto,
  UpdateVariantSizeDto,
} from './dto';
import { VariantColor, VariantSize } from './entities';
import { ErrorHandlerService } from '../common/services/error-handler';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(VariantSize)
    private readonly variantSizesRepository: Repository<VariantSize>,
    @InjectRepository(VariantColor)
    private readonly variantColorRepository: Repository<VariantColor>,
    private readonly errorhandlerService: ErrorHandlerService,
  ) {}

  async createVariantSize(
    createVariantDto: CreateVariantSizeDto,
  ): Promise<VariantSize> {
    try {
      const variantSize = this.variantSizesRepository.create({
        ...createVariantDto,
      });

      return await this.variantSizesRepository.save(variantSize);
    } catch (error) {
      this.errorhandlerService.errorHandler(error);
    }
  }

  async findAllVariantSize() {
    return `This action returns all variants`;
  }

  async findOneVariantSizes(id: number) {
    return `This action returns a #${id} variant`;
  }

  async updateVariantSize(id: number, updateVariantDto: UpdateVariantSizeDto) {
    return `This action updates a #${id} variant`;
  }

  async removeVariantSize(id: number) {
    return `This action removes a #${id} variant`;
  }

  async createVariantColor(createVariantDto: CreateVariantColorDto) {
    return 'This action adds a new variant';
  }

  async findAllVariantColors() {
    return `This action returns all variants`;
  }

  async findOneVariantColor(id: number) {
    return `This action returns a #${id} variant`;
  }

  async updateVariantColor(
    id: number,
    updateVariantDto: UpdateVariantColorDto,
  ) {
    return `This action updates a #${id} variant`;
  }

  async removeVariantColor(id: number) {
    return `This action removes a #${id} variant`;
  }
}
