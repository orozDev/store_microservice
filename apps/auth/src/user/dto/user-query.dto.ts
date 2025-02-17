import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../enums/user-role.enum';
import { Transform } from 'class-transformer';
import { PaginationQueryDto } from '@app/common/utils/dto/pagnation.dto';

export default class UserQueryDto extends PaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({ required: false, enum: UserRoleEnum })
  @IsOptional()
  @IsString()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value !== 'false' && value !== false)
  isActive: boolean;
}
