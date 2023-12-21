import { Controller, Get, Body, Put, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/userDto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/')
  async getUser(@Body() _id: string) {
    const user = await this.usersService.findById(_id);
    return user;
  }

  @UseGuards(AccessTokenGuard)
  @Put('/:_id')
  async updateUser(@Param() _id: string, @Body() userDto: UserDto) {
    const user = await this.usersService.update(userDto, _id);
    return user;
  }
}
