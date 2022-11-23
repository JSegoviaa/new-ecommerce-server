import { IsBoolean, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsPositive()
  category: Category;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isPublished: boolean;
}
