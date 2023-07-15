import { IsString, MinLength } from 'class-validator';

export class RefreshTokenDto {
  @MinLength(1, { message: 'Токен не должен быть пустой' })
  @IsString({ message: 'Токен должен быть строкой' })
  refreshToken: string;
}
