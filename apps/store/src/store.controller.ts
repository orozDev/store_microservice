import { Controller, Get } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller()
export class StoreController {
  constructor(private readonly appService: StoreService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
