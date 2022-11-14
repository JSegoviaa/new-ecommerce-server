import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from '../../auth/dto';

export class UpdateUserDto extends PartialType(RegisterDto) {}
