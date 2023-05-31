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
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Auth(ValidRoles.superAdmin)
  createRole(@Body() createRole: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRole);
  }

  @Get()
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  getAllRoles(@Query() queryDto: QueryDto): Promise<Roles> {
    return this.rolesService.findAll(queryDto);
  }

  @Get(':id')
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  findOneRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @Auth(ValidRoles.superAdmin)
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRole: UpdateRoleDto,
  ): Promise<Role> {
    return this.rolesService.update(id, updateRole);
  }

  @Delete(':id')
  @Auth(ValidRoles.superAdmin)
  deleteRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.rolesService.remove(id);
  }
}
