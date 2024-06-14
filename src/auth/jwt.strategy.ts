// jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // Aqui você pode implementar a lógica para validar o usuário, por exemplo, buscar no banco de dados
    // Se o usuário não for encontrado ou algo estiver errado, você pode lançar uma UnauthorizedException
    return { userId: payload.sub, username: payload.username };
  }
}
