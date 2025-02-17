import { Module } from '@nestjs/common';
import { ContextInterceptor } from './interceptors/context.interceptor';

@Module({
  providers: [ContextInterceptor],
  exports: [ContextInterceptor],
})
export default class UtilsModule {}
