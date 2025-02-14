import { Module } from '@nestjs/common';
import { ContextInterceptor } from './interceptors/context.interceptor';
import { IsOptionalNonNullable } from './validators/is-optional-non-nullable.validator';

@Module({
  providers: [ContextInterceptor, IsOptionalNonNullable],
  exports: [ContextInterceptor, IsOptionalNonNullable],
})
export default class UtilsModule {}
