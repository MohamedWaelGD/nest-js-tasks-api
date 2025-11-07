import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'mysecretkey',
      ignoreExpiration: false,
    });
  }

  async validate(payload: { sub: number; username: string }) {
    if (!payload.sub || !payload.username) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
