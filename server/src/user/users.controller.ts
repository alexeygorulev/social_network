import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

import {
  Controller,
  Delete,
  Get,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Получение пользователей')
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
