import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { User } from './entities';
import { CommonModule } from '../common/common.module';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
  exports: [UsersService],
})
export class UsersModule {}
