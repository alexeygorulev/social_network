import { InjectRepository } from '@nestjs/typeorm';

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { Setting } from './settings.model';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingsRepository: Repository<Setting>,
    private userService: UsersService,
  ) {}

  async createSettingUser(createSettingDto: CreateSettingDto): Promise<any> {
    try {
      const { id } = createSettingDto;
      const settings = new Setting();
      settings.name = createSettingDto.name;
      settings.lastName = createSettingDto.lastName;
      settings.status = createSettingDto.status;
      settings.familyStatus = createSettingDto.familyStatus;
      settings.dateBirthday = createSettingDto.dateBirthday;
      settings.place = createSettingDto.place;
      settings.university = createSettingDto.university;

      const user = await this.userService.getUserById(id);
      settings.user = user;

      const checkByEntity = await this.settingsRepository.findOne({
        where: { user },
      });
      return checkByEntity
        ? await this.settingsRepository.update(checkByEntity.id, {
            lastName: settings.lastName,
            name: settings.name,
            status: settings.status,
            familyStatus: settings.familyStatus,
            dateBirthday: settings.dateBirthday,
            place: settings.place,
            university: settings.university,
          })
        : await this.settingsRepository.save(settings);
    } catch (error) {}
  }
  async getSettingById(id): Promise<Setting> {
    const user = await this.userService.getUserById(id);
    const settingsUser = await this.settingsRepository.findOne({ where: { user } });
    return settingsUser ;
  }
}
