import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import UtilsModule from '@app/common/utils/utils.module';
import FileManagerModule from '@app/common/file-manager/file-manager.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ACCESS_SECRET_KEY: Joi.string().required(),
        REFRESH_SECRET_KEY: Joi.string().required(),
        ACCESS_SECRET_EXPIRES: Joi.string().required(),
        REFRESH_SECRET_KEY_EXPIRES: Joi.string().required(),
        STATIC_URL_PREFIX: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_SECRET_KEY'),
      }),
    }),
    PassportModule,
    UtilsModule,
    FileManagerModule,
    DatabaseModule,
    UserModule,
    NestjsFormDataModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
