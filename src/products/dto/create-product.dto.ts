import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
