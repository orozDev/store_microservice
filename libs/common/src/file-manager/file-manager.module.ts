import { Module } from '@nestjs/common';
import { FileManagerService } from '@app/common/file-manager/file.manager.service';

@Module({
  providers: [FileManagerService],
  exports: [FileManagerService],
})
export default class FileManagerModule {}
