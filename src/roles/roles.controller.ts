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
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { Role } from './entities';
import { RolesService } from './roles.service';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { Auth } from '../auth/decorators';

@Controller('roles')
@Auth(ValidRoles.superAdmin)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() createRole: CreateRoleDto): Promise<Role> {
    return await this.rolesService.create(createRole);
  }

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return await this.rolesService.findAll();
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
