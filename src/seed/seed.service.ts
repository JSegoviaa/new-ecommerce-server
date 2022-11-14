import { Injectable } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class SeedService {
  constructor(private readonly rolesService: RolesService) {}

  async runSeed() {}
}
