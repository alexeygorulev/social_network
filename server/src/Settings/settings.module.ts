import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UsersModule } from 'src/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/users.model';
import { Setting } from './settings.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Setting]), UsersModule],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsModule],
})
export class SettingsModule {}
