import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantOptionsService } from './variant-options.service';
import { VariantOptionsController } from './variant-options.controller';
import { AuthModule } from '../../auth/auth.module';
import { CommonModule } from '../../common/common.module';
import { VariantOption } from './entities';

@Module({
  controllers: [VariantOptionsController],
  providers: [VariantOptionsService],
  imports: [
    TypeOrmModule.forFeature([VariantOption]),
    AuthModule,
    CommonModule,
  ],
})
export class VariantOptionsModule {}
