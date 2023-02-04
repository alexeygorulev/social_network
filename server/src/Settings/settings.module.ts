import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
/*
https://docs.nestjs.com/modules
*/

import {  Module } from '@nestjs/common';
import { UsersModule } from 'src/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/users.model';
import { Setting } from './settings.model';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Setting]),
    forwardRef(() => UsersModule),
    AuthModule,
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
