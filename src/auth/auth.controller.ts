import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  singup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
}
