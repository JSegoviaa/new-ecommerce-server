import { Module } from '@nestjs/common';
import { VariantSizesModule } from './variant-sizes/variant-sizes.module';
import { VariantColorsModule } from './variant-colors/variant-colors.module';

@Module({ imports: [VariantSizesModule, VariantColorsModule] })
export class VariantsModule {}
