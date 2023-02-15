/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideosFile } from './videos.model';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideosFile)
    private videosRepository: Repository<VideosFile>,
  ) {}
  async uploadDatabaseFile(filename: string) {
    const newFile = await this.videosRepository.create({
      filename,
    });
    await this.videosRepository.save(newFile);
    return newFile;
  }
  async addVideo(filename: string): Promise<any> {
    const avatar = await this.uploadDatabaseFile(filename);

    return avatar;
  }

  async getFileById(fileId: any) {
    const file = await this.videosRepository.findOne({
      where: { id: fileId },
    });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async getAllVideo() {
    return await this.videosRepository.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<VideosFile>> {
    const allVideo = await this.videosRepository.createQueryBuilder('c')
    allVideo.orderBy("id", "DESC")
    return paginate<VideosFile>(allVideo, options);
  }
}
