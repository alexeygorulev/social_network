import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, } from "class-validator"
import {  } from "sequelize-typescript"

export class CreateUserDto {
  @ApiProperty({example: 'alexeygorulev@gmail.com', description: 'Почтовый ящик'})
  @IsEmail({}, {message: 'не  корректный email'})
  readonly email: string
  @ApiProperty({example: '123', description: 'Пароль'})
  @IsString({message: 'должно быть строкой'})
  readonly password: string
  @ApiProperty({example: 'Alexey', description: 'Имя пользователя'})
  @IsString({message: 'должно быть строкой'})
  readonly name: string


}