import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CategoriesModule } from '../categories/categories.module';
import { CommonModule } from '../common/common.module';
import { ProductsModule } from '../products/products.module';
import { RolesModule } from '../roles/roles.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { SubcategoriesModule } from '../subcategories/subcategories.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AuthModule,
    CategoriesModule,
    CommonModule,
    ProductsModule,
    RolesModule,
    RolesModule,
    SubcategoriesModule,
    UsersModule,
  ],
})
export class SeedModule {}
