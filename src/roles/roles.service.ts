import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleInput, UpdateRoleInput } from './dto';
import { Role } from './entities';
import { ErrorHandlerService } from '../common/services/error-handler';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    try {
      const newRole = this.rolesRepository.create(createRoleInput);

      return await this.rolesRepository.save(newRole);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      return this.rolesRepository.find();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findOne(id: number): Promise<Role> {
    try {
      const role = await this.rolesRepository.findOneBy({ id });

      if (!role) {
        throw new NotFoundException(`Role with id ${id} was not found`);
      }

      return role;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async update(id: number, updateRoleInput: UpdateRoleInput): Promise<Role> {
    try {
      const role = await this.rolesRepository.preload(updateRoleInput);

      await this.findOne(id);

      return await this.rolesRepository.save(role);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async remove(id: number): Promise<Role> {
    try {
      const role = await this.findOne(id);

      return { ...role, id };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
