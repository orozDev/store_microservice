import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IsUniqueUpdatingConstraint } from '@app/common/database/validators/is-unque-updating.validator';
import { IsUniqueConstraint } from '@app/common/database/validators/is-unque.validator';
import { IsExistedConstraint } from '@app/common/database/validators/is-exists.validator';

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
