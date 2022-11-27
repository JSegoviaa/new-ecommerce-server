import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';
import { SubcategoriesModule } from '../subcategories/subcategories.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule,
    CommonModule,
    SubcategoriesModule,
  ],
})
export class ProductsModule {}
