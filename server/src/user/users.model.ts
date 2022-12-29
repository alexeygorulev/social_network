import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'kekMaster', description: 'логин пользователя' })
  @Column({ type: 'varchar', unique: true })
  login: string;

  @ApiProperty({ example: 'kekMaster', description: 'логин пользователя' })
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty({ example: 'kekPassword', description: 'пароль пользователя' })
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty({ example: 'Спам', description: 'Статус бана пользователя' })
  @Column({ default: false })
  ban: boolean;
}
