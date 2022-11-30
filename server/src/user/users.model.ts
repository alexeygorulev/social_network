import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";


interface CreateUserAction {
  email: string
  password: string
}
@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserAction> {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'alexeygorulev@gmail.com', description: 'Почтовый ящик' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @ApiProperty({ example: '123', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @ApiProperty({ example: 'Alexey', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @ApiProperty({ example: 'true', description: 'Бан пользователя' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean

  @ApiProperty({ example: 'за дудос', description: 'Причина блокировки' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string

}