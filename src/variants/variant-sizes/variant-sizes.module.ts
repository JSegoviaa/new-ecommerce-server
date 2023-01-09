import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VariantsService } from './variant-sizes.service';
import { VariantsController } from './variant-sizes.controller';
import { AuthModule } from '../../auth/auth.module';
import { CommonModule } from '../../common/common.module';
import { VariantSize } from './entities';

@Module({
  controllers: [VariantsController],
  providers: [VariantsService],
  imports: [TypeOrmModule.forFeature([VariantSize]), AuthModule, CommonModule],
  exports: [TypeOrmModule, VariantSizesModule],
})
export class VariantSizesModule {}
