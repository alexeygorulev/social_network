import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class VideosFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  filename: string;
}
