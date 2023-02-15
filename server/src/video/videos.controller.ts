/*
https://docs.nestjs.com/controllers#controllers
*/

import {
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

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  // @Get(':id')
  // async getStaticFile(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Res({ passthrough: true }) response: Response,
  // ): Promise<StreamableFile> {
  //   const entity = await this.videosService.getFileById(id);

  //   const file = createReadStream(
  //     join(process.cwd(), `src/videos/${entity.filename}`),
  //   );
  //   console.log(entity.filename);

  //   response.set({
  //     'Content-Disposition': `inline; filename="${entity.filename}"`,
  //     'Content-Type': 'video',
  //   });
  //   console.log('asd');

  //   return new StreamableFile(file);
  // }
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


  // @Get('/all')
  // getAllVideo() {
  //   return this.videosService.getAllVideo();
  // }
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './videos' });
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
