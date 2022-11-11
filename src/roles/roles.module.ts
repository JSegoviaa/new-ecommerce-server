import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { Role } from './entities';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [RolesResolver, RolesService],
  imports: [TypeOrmModule.forFeature([Role]), CommonModule, AuthModule],
})
export class RolesModule {}
