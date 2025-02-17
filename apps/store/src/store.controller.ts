import { Controller, Get, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { JwtAuthGuard } from '@app/common/auth-lib/guards/jwt-auth.guard';
import { RetrieveUser } from '@app/common/auth-lib/decorators/retrieve-user.decorator';
import { UserEntity } from '@app/common/auth-lib/entities/user.entity';

@Controller()
export class StoreController {
  constructor(private readonly appService: StoreService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@RetrieveUser() user: UserEntity): string {
    console.log(user);
    return this.appService.getHello();
  }
}
