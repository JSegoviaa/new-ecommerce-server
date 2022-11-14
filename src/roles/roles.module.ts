import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from './roles.service';
import { Role } from './entities';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';
import { RolesController } from './roles.controller';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([Role]), CommonModule, AuthModule],
})
export class RolesModule {}
