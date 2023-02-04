import { ApiProperty } from '@nestjs/swagger';
import { Friend } from 'src/friends/friends.model';
import { Setting } from 'src/Settings/settings.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
export type UserRoleType = 'admin' | 'editor' | 'guest';

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

  @Column({
    type: 'enum',
    enum: ['admin', 'editor', 'guest'],
    default: 'guest',
  })
  role: UserRoleType;

  @OneToMany(() => Setting, (setting) => setting.user)
  setting: Setting;

  @OneToMany(() => Friend, (friend) => friend.user)
  friend: Friend[];


}
