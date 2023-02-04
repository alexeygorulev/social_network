import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { forwardRef, Module } from '@nestjs/common';
import { Setting } from 'src/Settings/settings.model';
import { AuthModule } from 'src/auth/auth.module';
import { SettingsModule } from 'src/Settings/settings.module';
import { Friend } from 'src/friends/friends.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Setting, Friend]),
    forwardRef(() => AuthModule),
    forwardRef(() => SettingsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
