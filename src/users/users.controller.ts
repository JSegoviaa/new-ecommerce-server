import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationDto } from '../common/dtos';
import { UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  async getUsers(@Query() paginationDto: PaginationDto): Promise<User[]> {
    return await this.usersService.getUsers(paginationDto);
  }

  @Get(':id')
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findUserById(id);
  }

  @Get('email/:email')
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return await this.usersService.findUserByEmail(email);
  }

  @Put(':id')
  @Auth()
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.superAdmin, ValidRoles.admin)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.deleteUser(id);
  }
}
