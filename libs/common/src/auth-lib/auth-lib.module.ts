import { Module } from '@nestjs/common';
import { RoleAuthGuard } from '@app/common/auth-lib/guards/role-auth.guard';
import { JwtAuthGuard } from '@app/common/auth-lib/guards/jwt-auth.guard';
import { JwtStrategy } from '@app/common/auth-lib/strategy/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common/services';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.REDIS,
        options: {
          host: 'redis',
          port: 6379,
        },
      },
    ]),
  ],
  providers: [RoleAuthGuard, JwtAuthGuard, JwtStrategy],
})
export default class AuthLibModule {}
