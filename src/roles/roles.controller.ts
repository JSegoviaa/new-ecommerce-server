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
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Role } from './entities';
import { RolesService } from './roles.service';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { Auth } from '../auth/decorators';
import { QueryDto } from '../common/dtos';
import { Roles } from './interfaces';

@Controller('roles')
@Auth(ValidRoles.superAdmin)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() createRole: CreateRoleDto): Promise<Role> {
    return await this.rolesService.create(createRole);
  }

  @Get()
  async getAllRoles(@Query() queryDto: QueryDto): Promise<Roles> {
    return await this.rolesService.findAll(queryDto);
  }

  @Get(':id')
  async findOneRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return await this.rolesService.findOne(id);
  }

  @Put(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRole: UpdateRoleDto,
  ): Promise<Role> {
    return await this.rolesService.update(id, updateRole);
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return await this.rolesService.remove(id);
  }
}
