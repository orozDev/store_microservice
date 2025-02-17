import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserEntity } from '../user/entities/user.entity';
import UserRepository from '../user/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('ACCESS_SECRET_KEY'),
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    const isActive = await this.authService.checkUserActivityById(payload.sub);

    if (!isActive) {
      throw new ForbiddenException('The user is not active');
    }

    return await this.userRepository.findById(payload.sub);
  }
}
