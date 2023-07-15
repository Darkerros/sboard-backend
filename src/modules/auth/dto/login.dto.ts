import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Почта не может быть пустой ' })
  @IsEmail({}, { message: 'Должно быть почтой' })
  email: string;

  @IsString({ message: 'Должен быть строкой' })
  @MinLength(9, { message: 'Не должен быть меньше 9 символов' })
  password: string;
}
