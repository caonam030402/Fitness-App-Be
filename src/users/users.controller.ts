import { Controller, Get, Body, Put, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/userDto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { successResponse } from 'src/utils';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(AccessTokenGuard)
  @Get('/:_id')
  async getUser(@Param() _id: string) {
    const user = await this.usersService.findById(_id);
    return successResponse('Lấy người dùng thành công', user);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/:_id')
  async updateUser(@Param() _id: string, @Body() userDto: UserDto) {
    const user = await this.usersService.update(userDto, _id);
    return successResponse('Cập nhập người dùng thành công', user);
  }
}
