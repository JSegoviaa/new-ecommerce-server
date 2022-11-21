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
import { User } from '../users/entities';
import { Auth, GetUser } from '../auth/decorators';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './entities';
import { ValidRoles } from '../auth/interfaces/valid-roles';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto, user);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.superAdmin, ValidRoles.admin, ValidRoles.moderador)
  async findOne(@Param('id') id: number): Promise<Category> {
    return await this.categoriesService.findOne(id);
  }

  @Put(':id')
  @Auth()
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return await this.categoriesService.update(id, updateCategoryDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.categoriesService.remove(id);
  }
}
