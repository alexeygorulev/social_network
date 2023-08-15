import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { Friend } from 'src/friends/friends.model';
import { DatabaseFilesService } from 'src/database/database.service';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { VideosFile } from 'src/video/videos.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly databaseFilesService: DatabaseFilesService,
  ) {}

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.databaseFilesService.uploadDatabaseFile(
      imageBuffer,
      filename,
    );
    await this.usersRepository.update(userId, {
      avatarId: avatar.id,
    });
    return avatar;
  }
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    user.role = createUserDto.role;

    return this.usersRepository.save(user);
  }
  async findAll(req): Promise<any> {
    const id = req;
    const users = await this.usersRepository.find({
      relations: {
        setting: true,
        friend: true,
      },
    });
    return users
      .map((item) => {
        delete item.password;
        return item;
      })
      .filter((item) => item.id != id);
  }
  async findAcceptUsers(req): Promise<any> {
    const id = req;
    const users = await this.usersRepository.find({
      relations: {
        setting: true,
      },
    });
    return users
      .map((item) => {
        delete item.password;
        return item;
      })
      .filter((item) => item.id != id);
  }

  getUserByLogin(login: string): Promise<User> {
    return this.usersRepository.findOne({ where: { login } });
  }
  getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async checkAddedFile(userId, video) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        videosFile: true,
      },
    });
    return !!user.videosFile.find((item) => item.id === video.id);
  }

  async getPaginateVideo(userId) {
    const allVideo = await this.usersRepository
      .createQueryBuilder('user')
      .where({ id: userId })
      .leftJoinAndSelect('user.videosFile', 'videosFile')
      .getMany();

    return allVideo[0];
  }

  async getAllUserVideo(userId) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        videosFile: true,
      },
    });

    return user.videosFile;
  }

  async addVideoFile(userId, video) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        videosFile: true,
      },
    });
    const duplicateVideo = await this.checkAddedFile(userId, video);
    const videoFile = user.videosFile.find((item) => item.id === video.id);
    if (duplicateVideo) {
      user.videosFile = user.videosFile
        .map((item) => (item.id === videoFile.id ? null : item))
        .filter((item) => item !== null);
      return this.usersRepository.save(user);
    } else {
      user.videosFile = [...user.videosFile, video];
      return this.usersRepository.save(user);
    }
  }

  async getUserById(id: string): Promise<any> {
    const users2 = await this.usersRepository.findOne({
      where: { id },
      relations: {
        friend: true,
        setting: true,
      },
    });

    const { password, ...rest } = users2;
    return rest;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async getFriends(arrFriendsId): Promise<any> {
    let arrFriend = [];
    for (let i = 0; i < arrFriendsId.length; i++) {
      const arrFriendItem = await this.usersRepository.findOne({
        where: { id: arrFriendsId[i] },
        relations: {
          setting: true,
        },
      });
      delete arrFriendItem.password;
      arrFriend.push(arrFriendItem);
    }

    return arrFriend;
  }
}
