import { Injectable } from '@nestjs/common';
import { Role } from '../roles/entities';
import { RolesService } from '../roles/roles.service';
import { initialData } from './data';

@Injectable()
export class SeedService {
  constructor(private readonly rolesService: RolesService) {}

  async runSeed() {}
}
