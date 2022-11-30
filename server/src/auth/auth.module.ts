import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../user/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env.PRIVATE_KEY || 'SECRET',
    signOptions: {
      expiresIn: '24h'
    }
  })],
  controllers: [
    AuthController,],
  providers: [
    AuthService,],
    exports: [
      AuthModule,
      JwtModule
    ]
})
export class AuthModule { }
