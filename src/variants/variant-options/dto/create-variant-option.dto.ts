import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Image } from '../../../images/entities';

export class CreateVariantOptionDto {
  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  grams?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  milimeters?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  length?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  width?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  height?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  diameter?: number;

  @IsArray()
  @IsNotEmpty()
  images: Image[];
}
