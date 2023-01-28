import { UsersService } from './../user/users.service';
import { UserDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/users.model';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto, res: Response) {
    const user = await this.validateUser(userDto);
    const { token } = await this.generateToken(user);
    this.setCookie(res, token);
    return { token };
  }

  async registration(userDto: CreateUserDto, res: Response) {
    const candidate = await this.userService.getUserByLogin(userDto.login);
    const candidateWithEmail = await this.userService.getUserByEmail(
      userDto.email,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (candidateWithEmail) {
      throw new HttpException(
        'Пользователь с такой почтой уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const { token } = await this.generateToken(user);
    this.setCookie(res, token);
    return this.generateToken(user);
  }
  private async setCookie(res: Response, token) {
    res.cookie('token', token);
  }
  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      login: user.login,
      ban: user.ban,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(userDto: UserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный логин или пароль',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    ); // сверяет пароли с БД

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный логин или пароль',
    });
  }
}
