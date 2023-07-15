import * as process from 'process';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";

import { UserService } from '@modules/user/user.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import UserModel from '@models/User.model';
import { HASH_PASSWORD_COUNT } from '@consts/auth-consts';
import { RefreshTokenDto } from '@modules/auth/dto/refresh-token.dto';
import { TOKEN_TYPE } from '@consts/token-type-const';

@Injectable()
export class AuthService {
  @Inject()
  private jwtService: JwtService;
  @Inject()
  private userService: UserService;

  generateToken(user: UserModel) {
    const tokenPayload = { id: user.id, email: user.email };

    const accessToken = this.jwtService.sign(tokenPayload, {
      expiresIn: `${process.env.ACCES_TOKEN_VALID_TIME}`,
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      expiresIn: `${process.env.REFRESH_TOKEN_VALID_TIME}`,
    });

    return { accessToken, refreshToken };
  }

  async login(dto: LoginDto) {
    const userToLogin = await this.userService.getUserByEmail(dto.email);

    if (!userToLogin) {
      throw new UnauthorizedException(
        'Неправильная почта и пароль или пользователь не зарегистрирован',
      );
    }

    const isPasswordEqual = await bcrypt.compare(
      dto.password,
      userToLogin.password,
    );

    if (!isPasswordEqual) {
      throw new UnauthorizedException(
        'Неправильная почта и пароль или пользователь не зарегистрирован',
      );
    }

    delete userToLogin.password;

    const tokens = this.generateToken(userToLogin);

    await this.userService.updateUser({ userId: userToLogin.id, ...tokens });

    return { ...userToLogin, ...tokens };
  }

  async register(dto: RegisterDto) {
    const isUserExist = !!(await this.userService.getUserByEmail(dto.email));

    if (isUserExist) {
      throw new UnauthorizedException('Пользователь уже зарегистрирован');
    }

    const hashedPassword = await bcrypt.hash(dto.password, HASH_PASSWORD_COUNT);

    const registerUser = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });
    delete registerUser.password;

    const tokens = this.generateToken(registerUser);

    await this.userService.updateUser({ userId: registerUser.id, ...tokens });

    return { ...registerUser, ...tokens };
  }

  async validateUserToken(
    token: string,
    tokenType: TOKEN_TYPE,
  ): Promise<UserModel> {
    const tokenPayload = await this.jwtService
      .verifyAsync(token, {
        ignoreExpiration: false,
      })
      .catch(() => {
        return false;
      });

    if (!tokenPayload?.id) {
      throw new BadRequestException('Токен не валидный');
    }

    const tokenUserOwner = await this.userService.getUserById(tokenPayload.id);

    const isCurrentToken = tokenUserOwner[tokenType] === token;

    if (!isCurrentToken) {
      throw new BadRequestException('Токен не валидный');
    }

    return tokenUserOwner;
  }

  async refreshToken(dto: RefreshTokenDto) {
    const tokenOwner = await this.validateUserToken(
      dto.refreshToken,
      TOKEN_TYPE.refresh,
    );

    const tokens = this.generateToken(tokenOwner);
    await this.userService.updateUser({
      userId: tokenOwner.id,
      ...tokens,
    });

    return tokens;
  }
}
