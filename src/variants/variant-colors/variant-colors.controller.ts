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
import { VariantColorsService } from './variant-colors.service';
import { CreateVariantColorDto, UpdateVariantColorDto } from './dto';
import { VariantColor } from './entities';
import { QueryDto } from '../../common/dtos/pagination.dto';
import { VariantColors } from './interfaces';

@Controller('variant-colors')
export class VariantColorsController {
  constructor(private readonly variantColorsService: VariantColorsService) {}

  @Post()
  async create(
    @Body() createVariantDto: CreateVariantColorDto,
  ): Promise<VariantColor> {
    return this.variantColorsService.create(createVariantDto);
  }

  @Get()
  async findAll(@Query() queryDto: QueryDto): Promise<VariantColors> {
    return this.variantColorsService.findAll(queryDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VariantColor> {
    return this.variantColorsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVariantDto: UpdateVariantColorDto,
  ): Promise<VariantColor> {
    return this.variantColorsService.update(id, updateVariantDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<VariantColor> {
    return this.variantColorsService.remove(id);
  }
}
