import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Setting } from 'src/Settings/settings.model';
import { User } from 'src/user/users.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Column,
} from 'typeorm';

@Entity()
export class Friend {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  request: boolean;

  @IsString()
  @Column({ type: 'varchar' })
  requestUserId: string;

  @IsString()
  @Column({ type: 'varchar' })
  acceptUserId: string;

  @ManyToOne(() => User, (user) => user.friend)
  user: User
}
