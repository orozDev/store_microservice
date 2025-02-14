import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IsUniqueConstraint } from './validators/is-unque.validator';
import { IsExistedConstraint } from './validators/is-exists.validator';
import { IsUniqueUpdatingConstraint } from './validators/is-unque-updating.validator';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    IsUniqueUpdatingConstraint,
    IsUniqueConstraint,
    IsExistedConstraint,
  ],
  exports: [
    IsUniqueUpdatingConstraint,
    IsUniqueConstraint,
    IsExistedConstraint,
  ],
})
export class DatabaseModule {}
