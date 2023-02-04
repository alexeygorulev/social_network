import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    switch (req.body.role) {
      case 'Админ':
        req.body.role = 'admin';
        break;
      case 'Модератор':
        req.body.role = 'editor';
        break;
      default:
        req.body.role = 'guest';
        break;
    }
    next();
  }
}
