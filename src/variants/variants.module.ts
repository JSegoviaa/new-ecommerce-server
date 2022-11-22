import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { VariantSize, VariantColor } from './entities';

@Module({
  controllers: [VariantsController],
  providers: [VariantsService],
  imports: [
    TypeOrmModule.forFeature([VariantSize, VariantColor]),
    AuthModule,
    CommonModule,
  ],
})
export class VariantsModule {}
