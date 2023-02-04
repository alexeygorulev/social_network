import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { SettingsService } from 'src/Settings/settings.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private settingsService: SettingsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }
      
      console.log('asd');
      const user = this.jwtService.verify(token);
      req.user = user;

      return true;
    } catch (e) {
      console.log(e);
      
    }
  }
}
