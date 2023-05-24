import { Controller, Get, Post, Body, UseFilters } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { LoginDto, RegisterDto } from './dto';
import { AuthResponse } from './interfaces';
import { User } from '../users/entities';
import { HttpExceptionFilter } from '../common/filters/http-exception';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return await this.authService.login(loginDto);
  }

  @Post('admin-login')
  async adminLogin(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return await this.authService.adminLogin(loginDto);
  }

  @Get('renew-jwt')
  @UseFilters(new HttpExceptionFilter())
  @Auth()
  async renewJwt(@GetUser() user: User): Promise<AuthResponse> {
    return await this.authService.renewJwt(user);
  }
}
