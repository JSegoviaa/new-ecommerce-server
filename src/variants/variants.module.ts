import { Module } from '@nestjs/common';
import { VariantSizesModule } from './variant-sizes/variant-sizes.module';
import { VariantColorsModule } from './variant-colors/variant-colors.module';
import { VariantOptionsModule } from './variant-options/variant-options.module';

@Module({
  imports: [VariantSizesModule, VariantColorsModule, VariantOptionsModule],
})
export class VariantsModule {}
