import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { initialData } from './data';
import { User } from '../users/entities';
import { Category } from '../categories/entities';
import { Subcategory } from '../subcategories/entities';
import { ErrorHandlerService } from '../common/services/error-handler';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async runSeed(): Promise<string> {
    if (process.env.NODE_ENV === 'development') {
      await this.deleteTables();
      await this.insertTables();
      return 'Seed completed';
    }

    return "Can't run this task in production environment";
  }

  private async deleteTables() {
    await this.deleteSubcategories();
    await this.deleteCategories();
    await this.deleteUsers();
    await this.deleteRoles();
  }

  private async insertTables() {
    await this.insertRoles();
    await this.insertUsers();
    await this.insertCategories();
  }

  private async insertRoles() {
    const seedRoles = initialData.roles;

    const roles: Role[] = [];

    try {
      seedRoles.forEach((role) => {
        roles.push(this.rolesRepository.create(role));
      });

      await this.rolesRepository.save(seedRoles);

      return roles[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteRoles() {
    try {
      const queryBuilder = this.rolesRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    try {
      seedUsers.forEach((user) => {
        users.push(this.usersRepository.create(user));
      });

      await this.usersRepository.save(seedUsers);

      return users[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteUsers() {
    try {
      const queryBuilder = this.usersRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async insertCategories() {
    const seedCategories = initialData.categories;

    const categories: Category[] = [];

    try {
      seedCategories.forEach((category) => {
        categories.push(this.categoryRepository.create(category));
      });

      await this.categoryRepository.save(seedCategories);

      return categories[0];
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteCategories() {
    try {
      const queryBuilder = this.categoryRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  private async deleteSubcategories() {
    try {
      const queryBuilder = this.subcategoryRepository.createQueryBuilder();

      await queryBuilder.delete().where({}).execute();
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
