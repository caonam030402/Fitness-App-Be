import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { successResponse } from 'src/utils';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const findEmail = await this.usersService.findByNameAndEmail(email, name);
    if (findEmail) {
      throw new UnauthorizedException('Email hoặc tên đăng nhập đã tồn tại');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = this.getTokens((await user)._id, name);

    return successResponse('Đăng nhập thành công', {
      user,
      access_token: (await token).accessToken,
      refresh_token: (await token).refreshToken,
      expires_refresh_token: process.env.ACCESS_TOKEN_EXPIRES_IN,
      expires: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
  }
  async getTokens(userId: string, name: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, name },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, name },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
