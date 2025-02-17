import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import AuthLibModule from '@app/common/auth-lib/auth-lib.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  imports: [
    AuthLibModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ACCESS_SECRET_KEY: Joi.string().required(),
        STATIC_URL_PREFIX: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/store/.env',
    }),
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
