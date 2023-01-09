import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VariantColorsService } from './variant-colors.service';
import { VariantColorsController } from './variant-colors.controller';
import { VariantColor } from './entities';
import { AuthModule } from '../../auth/auth.module';
import { CommonModule } from '../../common/common.module';

@Module({
  controllers: [VariantColorsController],
  providers: [VariantColorsService],
  imports: [TypeOrmModule.forFeature([VariantColor]), AuthModule, CommonModule],
  exports: [VariantColorsModule, TypeOrmModule],
})
export class VariantColorsModule {}
