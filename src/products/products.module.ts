import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';
import { SubcategoriesModule } from '../subcategories/subcategories.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule,
    CommonModule,
    SubcategoriesModule,
    TagsModule,
  ],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
