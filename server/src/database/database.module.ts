import { DatabaseFilesController } from './database.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DatabaseFilesService } from './database.service';
import { User } from 'src/user/users.model';
import DatabaseFile from './database.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, DatabaseFile])],
  controllers: [DatabaseFilesController],
  providers: [DatabaseFilesService],
  exports: [DatabaseFilesService],
})
export class DatabaseModule {}
