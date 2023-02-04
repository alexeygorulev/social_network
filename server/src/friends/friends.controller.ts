/*
https://docs.nestjs.com/controllers#controllers
*/

import { FriendsService } from './friends.service';
import { Body, Controller, Req, Get, Post, UseGuards } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Friend } from './friends.model';

@Controller()
export class FriendsController {
  constructor(private friendService: FriendsService) {}

  @Post('/friend')
  @UseGuards(JwtAuthGuard)
  login(@Req() req, @Body() createFriendDto: CreateFriendDto) {
    return this.friendService.requestNewFriend(createFriendDto, req.user);
  }

  @Get('/all')
  findAll(): Promise<Friend[]> {
    return this.friendService.findAll();
  }
}
