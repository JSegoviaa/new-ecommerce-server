import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities';
import { RegisterDto } from '../auth/dto';
import { ErrorHandlerService } from '../common/services/error-handler';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async findOneByEmailLogin(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ email });

      if (!user) {
        throw new BadRequestException(`Email or password doest not match`);
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Inactive user');
      }

      return user;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async create(registerDto: RegisterDto): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...registerDto,
        password: bcrypt.hashSync(registerDto.password, 10),
      });

      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findUserById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`User with id ${id} doest not exist`);
      }

      return user;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ email });

      if (!user) {
        throw new NotFoundException(`User with email ${email} doest not exist`);
      }

      return user;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
