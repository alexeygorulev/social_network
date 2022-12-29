import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService],

})
export class UsersModule {}
