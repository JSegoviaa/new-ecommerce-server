import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { CommonModule } from '../common/common.module';
import { Subcategory } from './entities';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  imports: [TypeOrmModule.forFeature([Subcategory]), CommonModule, AuthModule],
})
export class SubcategoriesModule {}
