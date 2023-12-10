import { Controller, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/')
  async getUser(@Body() _id: string) {
    const user = await this.usersService.findById(_id);
    return user;
  }
}
