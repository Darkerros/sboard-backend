import { MIN_PASSWORD_LENGH } from '@consts/auth-consts';

import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Должен быть строкой' })
  @IsOptional()
  nickname?: string;

  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Должно быть почтой' })
  email: string;

  @IsString({ message: 'Должно быть строкой' })
  @MinLength(MIN_PASSWORD_LENGH, {
    message: `Не должен быть меньше ${MIN_PASSWORD_LENGH} символов`,
  })
  password: string;
}
