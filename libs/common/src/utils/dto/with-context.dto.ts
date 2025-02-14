import { Allow } from 'class-validator';

export class WithContextDto<User> {
  @Allow()
  __context?: {
    user: User;
    params: object;
  };
}
