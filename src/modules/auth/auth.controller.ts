import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from '@modules/auth/dto/register.dto';
import { RefreshTokenDto } from '@modules/auth/dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @Post('/refresh')
  async updateToken(@Body() dto: RefreshTokenDto) {
    return await this.authService.refreshToken(dto);
  }
}
