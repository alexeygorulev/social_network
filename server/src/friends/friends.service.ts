import { InjectRepository } from '@nestjs/typeorm';

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { UsersService } from 'src/user/users.service';
import { Friend } from './friends.model';
import { CreateFriendDto } from './dto/create-friend.dto';

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
      requestFriend.request = true;

      requestFriend.user = acceptUser;

      const checkByEntityReverse = await this.friendsRepository.findOne({
        where: { acceptUserId: id, requestUserId: requestFriend.acceptUserId },
      });
      const checkByEntity = await this.friendsRepository.findOne({
        where: { acceptUserId: requestFriend.acceptUserId, requestUserId: id },
      });
      if (checkByEntity || checkByEntityReverse) return;

      return await this.friendsRepository.save(requestFriend);
    } catch (e) {
      console.log(e);
    }
  }

  async acceptNewFriend(createFriendDto: CreateFriendDto, req): Promise<any> {
    try {
      const acceptId = req.id;
      const requestId = createFriendDto.acceptUserId;
      const friendEntity = await this.friendsRepository.findOne({
        where: { acceptUserId: acceptId, requestUserId: requestId },
      });

      friendEntity.request = false;
      return await this.friendsRepository.save(friendEntity);
    } catch (error) {
      console.log(error);
    }
  }
  async declineFriend(createFriendDto: CreateFriendDto, req): Promise<any> {
    try {
      const acceptId = req.id;
      const requestId = createFriendDto.requestUserId;

      const friendEntity = await this.friendsRepository.findOne({
        where: { acceptUserId: acceptId, requestUserId: requestId },
      });
      console.log(friendEntity);

      return await this.friendsRepository.delete(friendEntity.id);
    } catch (error) {
      console.log(error);
    }
  }

  async getFriendsList(req): Promise<any> {
    try {
      let acceptId = req.id ? req.id : req;
      console.log(acceptId);
      
      const friendEntityRequest = await this.friendsRepository.find({
        where: { request: false, requestUserId: acceptId },
      });
      const friendEntityAccept = await this.friendsRepository.find({
        where: { request: false, acceptUserId: acceptId },
      });

      let arrFriends;
      if (friendEntityRequest && friendEntityAccept) {
        const arrAccept = friendEntityRequest.map((item) => item.acceptUserId);
        const arrRequest = friendEntityAccept.map((item) => item.requestUserId);
        arrFriends = [...arrAccept, ...arrRequest];
        return await this.userService.getFriends(arrFriends);
      }
      if (friendEntityRequest) {
        arrFriends = friendEntityRequest.map((item) => item.acceptUserId);
        return await this.userService.getFriends(arrFriends);
      }
      if (friendEntityAccept) {
        arrFriends = friendEntityAccept.map((item) => item.requestUserId);
        return await this.userService.getFriends(arrFriends);
      }
    } catch (error) {
      console.log(error);
    }
  }

  findAll(): Promise<Friend[]> {
    return this.friendsRepository.find();
  }
  async findFriendRequest(requestToken): Promise<any> {
    const { id } = requestToken;

    const users = await this.friendsRepository.find({
      where: { request: true, requestUserId: id },
    });
    return users.map((item) => item.acceptUserId);
  }

  async acceptListFriends(requestToken): Promise<any> {
    const { id } = requestToken;
    const allUsers = await this.userService.findAcceptUsers(requestToken);

    const users = await this.friendsRepository.find({
      where: { request: true, acceptUserId: id },
    });

    const requestUserId = users.map((item) => item.requestUserId);
    const requestFriends = allUsers.map((item) => {
      for (let i = 0; i < requestUserId.length; i++) {
        if (item.id === requestUserId[i]) return item;
      }
    });

    return requestFriends.filter((item) => item != null);
  }
}
