import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class UserDto {
  @ApiProperty({ example: 'alexeygorulev@gmail.com', description: 'Почтовый ящик' })
  @IsEmail({}, { message: 'не  корректный email' })
  readonly email: string

  @ApiProperty({ example: '123', description: 'Пароль' })
  @IsString({ message: 'должно быть строкой' })
  readonly password: string
}