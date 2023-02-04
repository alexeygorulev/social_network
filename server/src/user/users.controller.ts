import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Получение пользователей')
@Controller('/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  findById(@Req() req): Promise<User> {
    return this.usersService.getUserById(req.user.id);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
