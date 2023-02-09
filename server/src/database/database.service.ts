import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DatabaseFile from './database.model';

@Injectable()
export class DatabaseFilesService {
  constructor(
    @InjectRepository(DatabaseFile)
    private databaseFilesRepository: Repository<DatabaseFile>,
  ) {}

  async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
    const newFile = await this.databaseFilesRepository.create({
      filename,
      data: dataBuffer,
    });
    await this.databaseFilesRepository.save(newFile);
    return newFile;
  }

  async getFileById(fileId: any) {
    const file = await this.databaseFilesRepository.findOne({
      where: { id: fileId },
    });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
