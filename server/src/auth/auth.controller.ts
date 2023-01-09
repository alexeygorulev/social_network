import { AuthService } from './auth.service';
import { UserDto } from './dto/auth.dto';

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { User } from 'src/user/users.model';

@ApiTags('Авторизация')
@Controller('social_network_auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(
    @Body() userDto: UserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(userDto, response);
  }

  @Post('/registration')
  registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.registration(userDto, response);
  }
}
