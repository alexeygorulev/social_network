import { AuthService } from './auth.service';
import { UserDto } from './dto/auth.dto';

import {
  Body,
  Controller, Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @Post('/login')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto)
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }
}
