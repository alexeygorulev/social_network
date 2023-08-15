import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { forwardRef, Module } from '@nestjs/common';
import { Setting } from 'src/Settings/settings.model';
import { AuthModule } from 'src/auth/auth.module';
import { SettingsModule } from 'src/Settings/settings.module';
import { Friend } from 'src/friends/friends.model';
import DatabaseFile from 'src/database/database.model';
import { DatabaseModule } from 'src/database/database.module';
import { VideosFile } from 'src/video/videos.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Setting, Friend, DatabaseFile, VideosFile]),
    forwardRef(() => AuthModule),
    forwardRef(() => SettingsModule),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
