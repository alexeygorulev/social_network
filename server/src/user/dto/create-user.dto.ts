import { IsString, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleType } from '../users.model';

export class CreateUserDto {
  @ApiProperty({ example: 'kekMaster', description: 'логин пользователя' })
  @IsString({ message: 'должно быть строкой' })
  @Length(3, 15)
  readonly login: string;

  @ApiProperty({ example: 'kekMaster@gmail.com', description: 'почтовый адрес пользователя' })
  @IsString({ message: 'должно быть строкой' })
  @IsEmail({}, { message: 'не  корректный email' })
  @Length(3, 30)
  readonly email: string;

  @ApiProperty({ example: 'kekPassword', description: 'пароль пользователя' })
  @IsString({ message: 'должно быть строкой' })
  @Length(3, 20)
  readonly password: string;

  @IsString({ message: 'должно быть строкой' })
  role: UserRoleType;

}
