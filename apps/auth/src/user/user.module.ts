import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import FileManagerModule from '@app/common/file-manager/file-manager.module';
import UtilsModule from '@app/common/utils/utils.module';
import UserRepository from './repositories/user.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FileManagerModule,
    UtilsModule,
    NestjsFormDataModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, UserService],
})
export class UserModule {}
