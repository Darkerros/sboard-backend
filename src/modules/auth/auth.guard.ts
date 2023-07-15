import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { TOKEN_TYPE } from '@consts/token-type-const';

export class AuthGuard implements CanActivate {
  @Inject()
  private authService: AuthService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const tokenHeaders = req.headers.authorization;

    if (!tokenHeaders) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const bearerToken = tokenHeaders.split(' ')[1];

    if (!bearerToken) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    req.user = await this.authService
      .validateUserToken(bearerToken, TOKEN_TYPE.access)
      .catch(() => {
        throw new UnauthorizedException('Пользователь не авторизован');
      });

    return true;
  }
}
