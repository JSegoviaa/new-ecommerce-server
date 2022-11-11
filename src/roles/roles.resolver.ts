import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput, UpdateRoleInput } from './dto';
import { GetUserGql } from '../auth/decorators';
import { User } from '../users/entities';
import { ValidRoles } from '../auth/interfaces';
import { AuthGql } from '../auth/guards';

@Resolver(() => Role)
@UseGuards(AuthGql)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  async createRole(
    @GetUserGql([ValidRoles.superAdmin]) _user: User,
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<Role> {
    return this.rolesService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  async findAll(
    @GetUserGql([ValidRoles.superAdmin]) _user: User,
  ): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  async findOne(
    @GetUserGql([ValidRoles.superAdmin]) _user: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  async updateRole(
    @GetUserGql([ValidRoles.superAdmin]) _user: User,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ): Promise<Role> {
    return this.rolesService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => Role)
  async removeRole(
    @GetUserGql([ValidRoles.superAdmin]) _user: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Role> {
    return await this.rolesService.remove(id);
  }
}
