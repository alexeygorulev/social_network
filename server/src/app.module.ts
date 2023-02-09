import { DatabaseModule } from './database/database.module';
import { FriendsModule } from './friends/friends.module';
import { SettingsModule } from './Settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/users.model';
import { UsersModule } from './user/users.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './Settings/settings.model';
import { LoggerMiddleware } from './Settings/middleware/logger.middleware';
import { SettingsController } from './Settings/settings.controller';
import { RequestMethod } from '@nestjs/common/enums';
import { AuthController } from './auth/auth.controller';
import { Friend } from './friends/friends.model';
import DatabaseFile from './database/database.model';

@Module({
  imports: [
    DatabaseModule,
    FriendsModule,
    SettingsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      entities: [User, Setting, Friend, DatabaseFile],
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(SettingsController, AuthController);
  }
}
