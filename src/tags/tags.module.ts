import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tag } from './entities';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag]), CommonModule],
})
export class TagsModule {}
