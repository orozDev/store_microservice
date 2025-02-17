import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';
import { UserEntity } from '../user/entities/user.entity';

export const RetrieveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Promise<UserEntity | IUser> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
