/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Req, Request } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { Setting } from './settings.model';
import { SettingsService } from './settings.service';

@Controller('social_network')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Post('/settings')
  createSettings(
    @Body() createSettingsDto: CreateSettingDto,
  ) {
    
    return this.settingsService.createSettingUser(createSettingsDto);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<any> {
    return this.settingsService.getSettingById(id);
  }
}
