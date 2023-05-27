import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QueryDto } from '../common/dtos';
import { UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { Users } from './interface';
import { RegisterDto } from '../auth/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  async getUsers(@Query() queryDto: QueryDto): Promise<Users> {
    return await this.usersService.getUsers(queryDto);
  }

  @Get(':id')
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findUserById(id);
  }

  @Post('')
  @Auth(ValidRoles.superAdmin)
  createUser(@Body() registerDto: RegisterDto): Promise<User> {
    return this.usersService.create(registerDto);
  }

  @Get('email/:email')
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return await this.usersService.findUserByEmail(email);
  }

  @Put(':id')
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.superAdmin)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.deleteUser(id);
  }
}
