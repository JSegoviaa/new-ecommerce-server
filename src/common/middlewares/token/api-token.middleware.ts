import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiToken implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiToken = req.header('api-token');

    if (apiToken !== process.env.API_TOKEN) {
      throw new UnauthorizedException();
    }

    next();
  }
}
