import { UserRoleEnum } from '../../../../../apps/auth/src/user/enums/user-role.enum';
import * as bcryptjs from 'bcryptjs';

export class UserEntity {
  avatar: string;
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  password: string;
  phone: string;
  role: UserRoleEnum;

  get getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  async checkPassword(password): Promise<boolean> {
    return await bcryptjs.compare(password, this.password);
  }

  constructor(partial?: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
