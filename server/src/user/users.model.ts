import { ApiProperty } from '@nestjs/swagger';
import DatabaseFile from 'src/database/database.model';
import { Friend } from 'src/friends/friends.model';
import { Setting } from 'src/Settings/settings.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToOne,
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

  @JoinColumn({ name: 'avatarId' })
  @OneToOne(() => DatabaseFile, {
    nullable: true,
  })
  public avatar?: DatabaseFile;

  @Column({ nullable: true })
  public avatarId?: number;

  @OneToMany(() => Friend, (friend) => friend.user)
  friend: Friend[];
}
