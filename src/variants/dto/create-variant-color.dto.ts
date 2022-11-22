import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateVariantColorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(7)
  @MaxLength(7)
  color: string;
}
