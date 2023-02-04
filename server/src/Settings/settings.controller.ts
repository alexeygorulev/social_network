/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {  ParseUUIDPipe } from '@nestjs/common/pipes';
// import { RolesGuard } from 'src/roles/role.guard';
import { CreateSettingDto } from './dto/create-setting.dto';
import { ValidationPipe } from './pipe/validation.pipe';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('social_network')
// @UseGuards(RolesGuard)
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Post('/settings')
  async createSettings(
    @Body(new ValidationPipe()) createSettingsDto: CreateSettingDto,
  ) {
    return this.settingsService.createSettingUser(createSettingsDto);
  }

  @Get(':uuid')
  @UseGuards(JwtAuthGuard)
  findById(
    @Req() req,
    @Param(
      'uuid',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    uuid: string,
  ): Promise<any> {
    return this.settingsService.getSettingById(uuid);
  }
}
