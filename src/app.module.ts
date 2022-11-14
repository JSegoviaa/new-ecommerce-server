import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { ImagesModule } from './images/images.module';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { SeedModule } from './seed/seed.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { VariantsModule } from './variants/variants.module';
import { HistoryModule } from './history/history.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CommentsModule } from './comments/comments.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    CategoriesModule,
    CommonModule,
    FavoritesModule,
    HistoryModule,
    ImagesModule,
    ProductsModule,
    RolesModule,
    SeedModule,
    SubcategoriesModule,
    TagsModule,
    UsersModule,
    VariantsModule,
    CommentsModule,
    RatingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
