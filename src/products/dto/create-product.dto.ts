import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Tag } from '../../tags/entities';
import { Subcategory } from '../../subcategories/entities';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  discount: number;

  @IsBoolean()
  isPublished: boolean;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @IsNotEmpty()
  subcategory: Subcategory[];

  @IsArray()
  @IsNotEmpty()
  tag: Tag[];
}
