import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { FindOptionsOrderValue } from 'typeorm';

export class QueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // enableImplicitConversions: true
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number) // enableImplicitConversions: true
  offset?: number;

  @IsOptional()
  @IsString()
  order?: string;

  @IsOptional()
  @IsString()
  sort?: FindOptionsOrderValue;
}
