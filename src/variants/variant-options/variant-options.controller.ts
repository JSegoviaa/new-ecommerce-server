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
import { CreateVariantOptionDto, UpdateVariantOptionDto } from './dto';
import { VariantOption } from './entities';
import { VariantOptionsService } from './variant-options.service';

@Controller('variant-options')
export class VariantOptionsController {
  constructor(private readonly variantOptionsService: VariantOptionsService) {}

  @Post()
  create(
    @Body() createVariantOptionDto: CreateVariantOptionDto,
  ): Promise<VariantOption> {
    return this.variantOptionsService.create(createVariantOptionDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<VariantOption> {
    return this.variantOptionsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVariantOptionDto: UpdateVariantOptionDto,
  ): Promise<VariantOption> {
    return this.variantOptionsService.update(id, updateVariantOptionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<VariantOption> {
    return this.variantOptionsService.remove(id);
  }
}
