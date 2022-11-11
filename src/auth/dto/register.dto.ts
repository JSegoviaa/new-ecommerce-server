import { IsEmail, IsPositive, IsString, MinLength } from 'class-validator';
import { Role } from '../../roles/entities/role.entity';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsPositive()
  role: Role;
}
