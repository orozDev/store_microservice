import { ITokens } from '../interfaces/tokens.interface';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user/dto/user.dto';

export class UserWithTokensDto extends UserDto implements ITokens {
  @ApiProperty({ example: '' })
  accessToken: string;
  @ApiProperty({ example: '' })
  refreshToken: string;
}
