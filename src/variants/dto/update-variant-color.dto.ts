import { PartialType } from '@nestjs/mapped-types';
import { CreateVariantColorDto } from './create-variant-color.dto';

export class UpdateVariantColorDto extends PartialType(CreateVariantColorDto) {}
