import { InjectRepository } from '@nestjs/typeorm';

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { UsersService } from 'src/user/users.service';
import { Friend } from './friends.model';
import { CreateFriendDto } from './dto/create-friend.dto';
import e from 'express';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private friendsRepository: Repository<Friend>,
    private userService: UsersService,
  ) {}

  async requestNewFriend(createFriendDto: CreateFriendDto, req): Promise<any> {
    try {
      const { id } = req;

      const acceptUser = await this.userService.getUserById(
        createFriendDto.acceptUserId,
      );
      const requestFriend = new Friend();
      requestFriend.requestUserId = id;
      requestFriend.acceptUserId = createFriendDto.acceptUserId;
      requestFriend.request = createFriendDto.request;

      const requestUser = await this.userService.getUserById(id);
      requestFriend.user = acceptUser;

      const checkByEntityReverse = await this.friendsRepository.findOne({
        where: { acceptUserId: id, requestUserId: requestFriend.acceptUserId },
      });
      const checkByEntity = await this.friendsRepository.findOne({
        where: { acceptUserId: requestFriend.acceptUserId, requestUserId: id },
      });
      if (checkByEntity || checkByEntityReverse) return;

      await this.friendsRepository.save(requestFriend);

      const acceptFriend = new Friend();
      acceptFriend.requestUserId = id;
      acceptFriend.acceptUserId = createFriendDto.acceptUserId;
      acceptFriend.request = createFriendDto.request;
      acceptFriend.user = requestUser;
  
      return await this.friendsRepository.save(acceptFriend);
    } catch (e) {
      console.log(e);
    }

    // this.friendsRepository.save(requestFriend);
  }
  findAll(): Promise<Friend[]> {
    return this.friendsRepository.find();
  }
}
