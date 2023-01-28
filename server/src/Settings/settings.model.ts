import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/users.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar' })
  familyStatus: string;

  @Column({ type: 'varchar' })
  dateBirthday: string;

  @Column({ type: 'varchar' })
  place: string;

  @Column({ type: 'varchar' })
  university: string;

  @ManyToOne(() => User, (user) => user.setting)
    user: User
}
