import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Image } from '../../images/entities/image.entity';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isPublished: boolean;

  @IsPositive()
  @IsOptional()
  image?: Image;
}
