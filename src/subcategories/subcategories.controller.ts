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
import { Auth, GetUser } from '../auth/decorators';
import { CreateSubcategoryDto, UpdateSubcategoryDto } from './dto';
import { Subcategory } from './entities';
import { SubcategoriesService } from './subcategories.service';
import { User } from '../users/entities/user.entity';
import { QueryDto } from '../common/dtos/pagination.dto';
import { Subcategories } from './interfaces';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @Auth()
  async create(
    @Body() createSubcategoryDto: CreateSubcategoryDto,
    @GetUser() user: User,
  ): Promise<Subcategory> {
    return await this.subcategoriesService.create(createSubcategoryDto, user);
  }

  @Get()
  async findAll(@Query() queryDto: QueryDto): Promise<Subcategories> {
    return await this.subcategoriesService.findAll(queryDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Subcategory> {
    return await this.subcategoriesService.findOne(+id);
  }

  @Put(':id')
  @Auth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
    @GetUser() user: User,
  ): Promise<Subcategory> {
    return await this.subcategoriesService.update(
      id,
      updateSubcategoryDto,
      user,
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Subcategory> {
    return await this.subcategoriesService.remove(+id);
  }
}
