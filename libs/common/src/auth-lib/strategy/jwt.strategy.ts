import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_SERVICE } from '@app/common/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from '@app/common/auth-lib/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_SECRET_KEY'),
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    const isActive = await this.authClient
      .send<boolean>('is_active_user', payload.sub)
      .toPromise();

    if (!isActive) {
      throw new ForbiddenException('The user is not active');
    }

    return await this.authClient
      .send<UserEntity | null>('find_one_by_id', payload.sub)
      .toPromise();
  }
}
