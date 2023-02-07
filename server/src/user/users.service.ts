import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { Friend } from 'src/friends/friends.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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
