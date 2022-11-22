import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVariantSizeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  short: string;
}
