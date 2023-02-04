// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { SettingsService } from 'src/Settings/settings.service';
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private settingsService: SettingsService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<any> {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());

//     if (!roles) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();

//     const { id } = request.body;
    
//     const settingsUser = await this.settingsService.getSettingById(id);
//     const checkRoles = roles.find((item) => item === settingsUser.role);
//     return checkRoles === 'admin' ? true : false;
//   }
// }
