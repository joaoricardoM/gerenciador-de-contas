import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Missing authorization token' });
    }

    const isValid = await this.authService.validateToken(token);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next();
  }
}
