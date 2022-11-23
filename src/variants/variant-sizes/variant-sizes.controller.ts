import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateVariantSizeDto, UpdateVariantSizeDto } from './dto';
import { VariantSize } from './entities';
import { VariantsService } from './variant-sizes.service';
import { QueryDto } from '../../common/dtos/pagination.dto';
import { VariantSizes } from './interfaces';

@Controller('variant-sizes')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post()
  async create(
    @Body() createVariantDto: CreateVariantSizeDto,
  ): Promise<VariantSize> {
    return await this.variantsService.create(createVariantDto);
  }

  @Get()
  async findAll(@Query() queryDto: QueryDto): Promise<VariantSizes> {
    return this.variantsService.findAll(queryDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VariantSize> {
    return this.variantsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVariantDto: UpdateVariantSizeDto,
  ): Promise<VariantSize> {
    return this.variantsService.update(id, updateVariantDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<VariantSize> {
    return this.variantsService.remove(id);
  }
}
