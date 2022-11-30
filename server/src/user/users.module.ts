import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { User } from './users.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [
    UsersController,],
  providers: [
    UsersService,],
    exports: [UsersService]
})
export class UsersModule { }
