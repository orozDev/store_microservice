import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { UserDto } from './dto/user.dto';
import { UserRoleEnum } from './enums/user-role.enum';
import { StripContextPipe } from '@app/common/utils/pipes/strip-context.pipe';
import MongoIdDto from '@app/common/database/dto/mongo-id.dto';
import { ContextInterceptor } from '@app/common/utils/interceptors/context.interceptor';
import UserQueryDto from './dto/user-query.dto';
import { RoleAuthGuard } from '../guards/role-auth.guard';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('User')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: UserDto })
  // @ApiBearerAuth()
  // @Roles(UserRoleEnum.ADMIN)
  // @UseGuards(RoleAuthGuard)
  @Post()
  @FormDataRequest()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return UserDto.fromEntity(user);
  }

  @ApiResponse({ type: [UserDto] })
  @ApiBearerAuth()
  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(RoleAuthGuard)
  @Get()
  async findAll(@Query() usesQueryDto: UserQueryDto) {
    return await this.userService.findAll(usesQueryDto);
  }

  @ApiResponse({ type: UserDto })
  @ApiBearerAuth()
  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(RoleAuthGuard)
  @Get(':id')
  async findOne(@Param() { id }: MongoIdDto) {
    return await this.userService.findOne(id);
  }

  @ApiResponse({ type: UserDto })
  @ApiBearerAuth()
  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(RoleAuthGuard)
  @FormDataRequest()
  @UseInterceptors(ContextInterceptor)
  @Patch(':id')
  async update(
    @Param() { id }: MongoIdDto,
    @Body(StripContextPipe) updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, updateUserDto);
    return UserDto.fromEntity(user);
  }

  @ApiResponse({ type: UserDto, status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(RoleAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param() { id }: MongoIdDto) {
    const user = await this.userService.remove(id);
    return UserDto.fromEntity(user);
  }
}
