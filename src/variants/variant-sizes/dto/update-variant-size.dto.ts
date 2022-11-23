import { PartialType } from '@nestjs/mapped-types';
import { CreateVariantSizeDto } from './create-variant-size.dto';

export class UpdateVariantSizeDto extends PartialType(CreateVariantSizeDto) {}
