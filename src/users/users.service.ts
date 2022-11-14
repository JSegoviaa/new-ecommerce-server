import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';

import { User } from './entities';
import { RegisterDto } from '../auth/dto';
import { ErrorHandlerService } from '../common/services/error-handler';
import { PaginationDto } from '../common/dtos';
import { UpdateUserDto } from './dto';
import { ValidRoles } from 'src/auth/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async getUsers(paginationDto: PaginationDto): Promise<User[]> {
    const { limit = 10, offset = 10 } = paginationDto;

    try {
      const users = await this.usersRepository.find({
        take: limit,
        skip: offset,
      });

      users.forEach((user) => delete user.password);

      return users;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

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

      delete user.password;

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

      delete user.password;

      return user;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    reqUser: User,
  ): Promise<User> {
    try {
      this.validateReqUser(id, reqUser);

      await this.findUserById(id);

      const user = await this.usersRepository.preload({ id, ...updateUserDto });

      delete user.password;

      user.updatedAt = dayjs().format();

      return await this.usersRepository.save(user);
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const user = await this.findUserById(id);

      await this.usersRepository.remove(user);

      return { ...user, id };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  validateReqUser(id: number, user: User): boolean {
    if (
      user.role.role === ValidRoles.superAdmin ||
      user.role.role === ValidRoles.admin
    ) {
      return true;
    }

    if (id !== user.id) {
      throw new UnauthorizedException("You can't edit other users profile");
    }

    return true;
  }
}
