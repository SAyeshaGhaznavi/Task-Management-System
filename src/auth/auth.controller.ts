import {Controller,Post,Body,Res,Req,UnauthorizedException, HttpCode, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const { user_id, password } = body;
    const user = await this.authService.validateUser(user_id, password);

    const tokens = await this.authService.login(user);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ access_token: tokens.access_token });
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies?.refresh_token;
    if (!token) throw new UnauthorizedException('No refresh token found');

    const newAccessToken = await this.authService.refreshAccessToken(token);

    return res.json({ access_token: newAccessToken });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refresh_token');
    return res.json({ message: 'Logged out' });
  }
}