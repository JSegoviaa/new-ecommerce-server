import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities';
import { ErrorHandlerService } from '../common/services/error-handler';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { QueryDto } from '../common/dtos';
import { Roles } from './interfaces';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const newRole = this.rolesRepository.create(createRoleDto);

      return await this.rolesRepository.save(newRole);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findAll(queryDto: QueryDto): Promise<Roles> {
    const { limit = 10, offset = 0, sort = 'ASC', order = 'id' } = queryDto;
    try {
      const [roles, total] = await Promise.all([
        this.rolesRepository.find({
          take: limit,
          skip: offset,
          order: { [order]: sort },
        }),
        this.rolesRepository.count(),
      ]);

      return { total, roles };
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

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      await this.findOne(id);

      const role = await this.rolesRepository.preload({ id, ...updateRoleDto });

      return await this.rolesRepository.save(role);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async remove(id: number): Promise<Role> {
    try {
      const role = await this.findOne(id);

      await this.rolesRepository.remove(role);

      return { ...role, id };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
