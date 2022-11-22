import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateVariantColorDto,
  CreateVariantSizeDto,
  UpdateVariantColorDto,
  UpdateVariantSizeDto,
} from './dto';
import { VariantSize } from './entities';
import { VariantsService } from './variants.service';

@Controller('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post('colors')
  async createVariantColor(@Body() createVariantDto: CreateVariantColorDto) {
    return this.variantsService.createVariantColor(createVariantDto);
  }

  @Get('colors')
  async findAllVariantColors() {
    return this.variantsService.findAllVariantColors();
  }

  @Get('colors/:id')
  async findOneVariantColor(@Param('id', ParseIntPipe) id: number) {
    return this.variantsService.findOneVariantColor(id);
  }

  @Put('colors/:id')
  async updateVariantColor(
    @Param('id') id: number,
    @Body() updateVariantDto: UpdateVariantColorDto,
  ) {
    return this.variantsService.updateVariantColor(id, updateVariantDto);
  }

  @Delete('colors/:id')
  async removeVariantColor(@Param('id', ParseIntPipe) id: number) {
    return this.variantsService.removeVariantColor(id);
  }

  @Post('sizes')
  async createVariantSize(
    @Body() createVariantDto: CreateVariantSizeDto,
  ): Promise<VariantSize> {
    return await this.variantsService.createVariantSize(createVariantDto);
  }

  @Get('sizes')
  async findAllVariantSizes() {
    return this.variantsService.findAllVariantSize();
  }

  @Get('sizes/:id')
  async findOneVariantSize(@Param('id', ParseIntPipe) id: number) {
    return this.variantsService.findOneVariantSizes(id);
  }

  @Put('sizes/:id')
  async updateVariantSize(
    @Param('id') id: number,
    @Body() updateVariantDto: UpdateVariantSizeDto,
  ) {
    return this.variantsService.updateVariantSize(id, updateVariantDto);
  }

  @Delete('sizes/:id')
  async removeVariantSize(@Param('id', ParseIntPipe) id: number) {
    return this.variantsService.removeVariantSize(id);
  }
}
