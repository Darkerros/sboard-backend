import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Поле не должно быть строкой' })
  @MinLength(1, { message: 'Поле не должно быть пустым' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Поле не должно быть строкой' })
  description: string;
}
