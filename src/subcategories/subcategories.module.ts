import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesResolver } from './subcategories.resolver';

@Module({
  providers: [SubcategoriesResolver, SubcategoriesService]
})
export class SubcategoriesModule {}
