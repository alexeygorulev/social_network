import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosFile } from './videos.model';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([VideosFile]),
  ],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [VideosModule],
})
export class VideosModule {}
