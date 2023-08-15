import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosFile } from './videos.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideosFile]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [VideosModule],
})
export class VideosModule {}
