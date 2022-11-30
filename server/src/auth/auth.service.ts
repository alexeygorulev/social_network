import { UsersService } from './../user/users.service';
import { UserDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs'
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/users.model';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (candidate) {
      throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({ ...userDto, password: hashPassword })
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName
    }
    return {
      token: this.jwtService.sign(payload)
    }
  }
  private async validateUser(userDto: UserDto) {
    const user = await this.userService.getUserByEmail(userDto.email)
    if (!user) {
      throw new UnauthorizedException({ message: 'Некорректный email или пароль' })
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)// сверяет пароли с БД
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({ message: 'Некорректный email или пароль' })
  }

}
