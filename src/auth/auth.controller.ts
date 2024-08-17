import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from './gaurds';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() credentials: { email: string; password: string },
  ) {
    const email = credentials.email;
    const password = credentials.password;

    const userDetails: User = await this.authService.validateUser(
      email,
      password,
    );

    res.cookie('user_token', this.jwtService.sign(credentials), {
      expires: new Date(Date.now() + 3600000),
    });

    return { userDetails };
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res) {
    res.cookie('user_token', '', { expires: new Date(Date.now()) });
    return { msg: 'Logout Success Full' };
  }
}
