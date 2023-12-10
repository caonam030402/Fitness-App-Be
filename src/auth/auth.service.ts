import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { successResponse } from 'src/utils';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { authDto } from './dto/authDto';

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
  async signIn(body: authDto) {
    const { email, password } = body;

    const user = await this.usersService.findByEmail(email);

    if (!user)
      throw new BadRequestException('Account or password is incorrect');

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      throw new BadRequestException('Account or password is incorrect');

    const tokens = await this.getTokens(user._id, user.name);
    console.log(body);
    return successResponse('Đăng nhập thành công', {
      user,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
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
    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  }

  async verifiToken(token: string, type: 'access_token' | 'refresh_token') {
    token = token.split(' ')[1];

    let decoded;

    type === 'access_token'
      ? (decoded = this.jwtService.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET as JwtVerifyOptions,
        ))
      : (decoded = this.jwtService.verify(
          token,
          process.env.REFRESH_TOKEN_SECRET as JwtVerifyOptions,
        ));

    const user = await this.usersService.findById(decoded._id);

    if (!user) throw new BadRequestException('Token not found');

    return user;
  }

  async refreshToken(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user._id, user.name);

    return tokens;
  }
}
