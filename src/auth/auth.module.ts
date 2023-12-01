import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Auth } from './auth';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [Auth, AuthService],
})
export class AuthModule {}
