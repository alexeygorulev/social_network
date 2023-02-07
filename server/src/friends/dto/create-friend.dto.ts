import { IsString, Length, IsEmail, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendDto {
  @IsString({ message: 'должно быть строкой' })
  requestUserId: string;

  @IsString({ message: 'должно быть строкой' })
  acceptUserId: string;

  @IsBoolean()
  request: boolean;
}

