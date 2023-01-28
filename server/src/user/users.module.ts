import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { Module } from '@nestjs/common';
import { Setting } from 'src/Settings/settings.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Setting])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService],

})
export class UsersModule {}
