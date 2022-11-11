import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto, RegisterDto } from './dto';
import { UsersService } from '../users/users.service';
import { AuthResponse } from './interfaces';
import { User } from '../users/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwt(id: number): string {
    return this.jwtService.sign({ id });
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const user = await this.usersService.create(registerDto);

    delete user.password;

    const token = this.getJwt(user.id);

    return { token, user };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const user = await this.usersService.findOneByEmailLogin(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Email or password does not match.');
    }

    delete user.password;

    const token = this.getJwt(user.id);

    return { token, user };
  }

  async renewJwt(user: User): Promise<AuthResponse> {
    const token = this.getJwt(user.id);

    return { token, user };
  }

  async validateUser(id: number): Promise<User> {
    const user = await this.usersService.findUserById(id);

    delete user.password;

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Inactive user');
    }

    return user;
  }
}
