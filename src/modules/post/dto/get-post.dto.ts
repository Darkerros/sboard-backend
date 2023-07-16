import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetPostDto {
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  query: string;

  @IsOptional()
  @IsNumberString({}, { message: 'Должна быть числом' })
  page: number;

  @IsOptional()
  @IsNumberString({}, { message: 'Должна быть числом' })
  limit: number;
}
