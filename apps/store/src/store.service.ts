import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  getHello(): string {
    return 'Hello World! from store';
  }
}
