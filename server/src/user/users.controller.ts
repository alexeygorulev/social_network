import { UsersService } from './users.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Получение пользователей')
@Controller('/users')
export class UsersController {
  constructor(private userService: UsersService) { }
  @Get()
  getAll() {
    return this.userService.getAllUsers()
  }
}
