import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"

export class UserDto {
  @ApiProperty({ example: 'kekMaster', description: 'логин пользователя' })
  @IsString({ message: 'должно быть строкой' })
  @Length(3, 20)
  readonly login: string;

  @ApiProperty({ example: 'kekPassword', description: 'пароль пользователя' })
  @IsString({ message: 'должно быть строкой' })
  @Length(3, 20)
  readonly password: string;
}