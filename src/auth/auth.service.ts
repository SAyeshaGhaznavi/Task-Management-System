import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user_id: number, password: string) {
    const user = await this.usersService.findOne(user_id);
    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.user_id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOne(payload.sub);
      if (!user) throw new UnauthorizedException();

      const newAccessToken = this.jwtService.sign(
        { username: user.user_name, sub: user.user_id },
        { expiresIn: '15m' },
      );

      return newAccessToken;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
