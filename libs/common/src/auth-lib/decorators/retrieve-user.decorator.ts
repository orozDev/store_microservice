import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@app/common/auth-lib/entities/user.entity';

export const RetrieveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Promise<UserEntity> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
