import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUpDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  singup(@Body() sigUpDto: signUpDto) {
    return '';
  }
}
