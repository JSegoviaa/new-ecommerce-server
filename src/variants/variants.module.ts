import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsResolver } from './variants.resolver';

@Module({
  providers: [VariantsResolver, VariantsService]
})
export class VariantsModule {}
