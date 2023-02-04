import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Friend } from './friends.model';
import { User } from 'src/user/users.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from 'src/Settings/settings.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Friend]),
    UsersModule,
    SettingsModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
