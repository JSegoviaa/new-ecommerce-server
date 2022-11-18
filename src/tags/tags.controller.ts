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
import { CreateTagDto, UpdateTagDto } from './dto';
import { Tag } from './entities';
import { TagsService } from './tags.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Tags } from './interface';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @Auth(ValidRoles.superAdmin)
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagsService.create(createTagDto);
  }

  @Get()
  @Auth(ValidRoles.superAdmin)
  async findAll(@Query() paginationDto: PaginationDto): Promise<Tags> {
    return await this.tagsService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.superAdmin)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return await this.tagsService.findOne(id);
  }

  @Get('name/:name')
  @Auth(ValidRoles.superAdmin, ValidRoles.admin, ValidRoles.moderador)
  async findOneByName(@Param('name') name: string): Promise<Tag> {
    return await this.tagsService.findOneByName(name);
  }

  @Put(':id')
  @Auth(ValidRoles.superAdmin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.superAdmin)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return await this.tagsService.remove(id);
  }
}
