import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsNumber({}, { message: 'Поле не должно быть пустым' })
  postId: number;

  @IsString({ message: 'Поле не должно быть строкой' })
  @MinLength(1, { message: 'Поле не должно быть пустым' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Поле не должно быть строкой' })
  description: string;
}
