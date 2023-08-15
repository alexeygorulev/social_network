import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Res,
  Header,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@ApiTags('Получение пользователей')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('file')
  @Header('Content-Type', 'image')
  @Header('Content-Disposition', 'inline; filename="feed-2.jpg"')
  getStaticFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'src/assets/feed-2.jpg'));
    return new StreamableFile(file);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req): Promise<User[]> {
    return this.usersService.findAll(req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  findById(@Req() req): Promise<User> {
    return this.usersService.getUserById(req.user.id);
  }
  @Get('profile/friend')
  getProfileUser(@Query() query): any {
    return this.usersService.getUserById(query.id);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() request: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);

    return this.usersService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }
}
