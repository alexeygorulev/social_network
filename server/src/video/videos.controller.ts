/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Readable } from 'stream';
import { editFileName } from './utils';
import { VideosService } from './videos.service';
import { Response } from 'express';
import { VideosFile } from './videos.model';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { UsersService } from 'src/user/users.service';

@Controller('videos')
export class VideosController {
  constructor(
    private videosService: VideosService,
    private usersService: UsersService,
  ) {}

  @Get('mine')
  @UseGuards(JwtAuthGuard)
  async indexMine(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Req() req,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.videosService.paginateMyVideos(req.user.id, {
      page,
      limit,
      route: 'http://localhost:3001/videos/mine',
    });
  }

  @Get('/all')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<VideosFile>> {
    limit = limit > 100 ? 100 : limit;
    return this.videosService.paginate({
      page,
      limit,
      route: 'http://localhost:3001/videos/all',
    });
  }

  @Get(':id')
  seeUploadedFile(@Param('id') id, @Res() res) {
    return res.sendFile(id, { root: './videos' });
  }

  @Post('/append')
  @UseGuards(JwtAuthGuard)
  addedToYourSelfVideo(@Req() req, @Body() video) {
    return this.usersService.addVideoFile(req.user.id, video);
  }

  @Post('/checked')
  @UseGuards(JwtAuthGuard)
  checkIsAddedVideo(@Req() req, @Body() video) {
    return this.usersService.checkAddedFile(req.user.id, video);
  }

  @Post('add')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './videos',
        filename: editFileName,
      }),
    }),
  )
  async addVideo(
    @Req() request: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.videosService.addVideo(file.filename);
  }
}
