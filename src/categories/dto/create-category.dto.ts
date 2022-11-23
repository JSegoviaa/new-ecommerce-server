import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isPublished: boolean;
}
