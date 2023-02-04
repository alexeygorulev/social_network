import { IsString, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @IsString({ message: 'должно быть строкой' })
  id: string;
  @IsString({ message: 'должно быть строкой' })
  name: string;

  @IsString({ message: 'должно быть строкой' })
  lastName: string;

  @IsString({ message: 'должно быть строкой' })
  status: string;

  @IsString({ message: 'должно быть строкой' })
  familyStatus: string;

  @IsString({ message: 'должно быть строкой' })
  dateBirthday: string;

  @IsString({ message: 'должно быть строкой' })
  place: string;

  @IsString({ message: 'должно быть строкой' })
  university: string;


}
