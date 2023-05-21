import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { CommonModule } from './common/common.module';
import { FavoritesModule } from './favorites/favorites.module';
import { HistoryModule } from './history/history.module';
import { ImagesModule } from './images/images.module';
import { ProductsModule } from './products/products.module';
import { RatingsModule } from './ratings/ratings.module';
import { RolesModule } from './roles/roles.module';
// import { SeedModule } from './seed/seed.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { VariantsModule } from './variants/variants.module';
import { ApiToken } from './common/middlewares/token';
import { LogsMiddleware } from './common/middlewares/log';
import { ThrottlerModule } from '@nestjs/throttler';

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
    ThrottlerModule.forRoot({
      ttl: +process.env.THROTTLER_TTL,
      limit: +process.env.THROTTLER_LIMIT,
    }),
    AuthModule,
    CategoriesModule,
    CommentsModule,
    CommonModule,
    FavoritesModule,
    HistoryModule,
    ImagesModule,
    ProductsModule,
    RatingsModule,
    RolesModule,
    // SeedModule,
    SubcategoriesModule,
    TagsModule,
    UsersModule,
    VariantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
    consumer.apply(ApiToken).exclude('/api/auth/(.*)').forRoutes('*');
  }
}
