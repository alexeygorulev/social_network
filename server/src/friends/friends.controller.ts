/*
https://docs.nestjs.com/controllers#controllers
*/

import { FriendsService } from './friends.service';
import { Body, Controller, Req, Get, Post, UseGuards } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Friend } from './friends.model';
import { Query } from '@nestjs/common/decorators';

@Controller('/friends')
export class FriendsController {
  constructor(private friendService: FriendsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  login(@Req() req, @Body() createFriendDto: CreateFriendDto) {
    return this.friendService.requestNewFriend(createFriendDto, req.user);
  }
  @Post('/accept')
  @UseGuards(JwtAuthGuard)
  acceptNewFriend(@Req() req, @Body() createFriendDto: CreateFriendDto) {
    return this.friendService.acceptNewFriend(createFriendDto, req.user);
  }

  @Get('/all')
  findAll(): Promise<Friend[]> {
    return this.friendService.findAll();
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  getFriendsList(@Req() req): Promise<Friend[]> {
    return this.friendService.getFriendsList(req.user);
  }
  @Get('/list')
  getFriends(@Query() query): Promise<Friend[]> {
    return this.friendService.getFriendsList(query.id);
  }
  @Get('/requests')
  @UseGuards(JwtAuthGuard)
  findFriendRequest(@Req() req): Promise<Friend[]> {
    return this.friendService.findFriendRequest(req.user);
  }
  @Get('/acceptsList')
  @UseGuards(JwtAuthGuard)
  acceptListFriends(@Req() req): Promise<Friend[]> {
    return this.friendService.acceptListFriends(req.user);
  }
  @Post('/decline')
  @UseGuards(JwtAuthGuard)
  declineFriend(
    @Req() req,
    @Body() createFriendDto: CreateFriendDto,
  ): Promise<any> {
    return this.friendService.declineFriend(createFriendDto, req.user);
  }
}
