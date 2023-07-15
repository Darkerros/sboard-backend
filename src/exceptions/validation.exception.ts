import { HttpException, HttpStatus } from '@nestjs/common';
import { validationErrorStatus } from '@consts/exception-status-consts';

export class ValidationException extends HttpException {
  constructor(private errors: { [key: string]: string }) {
    super(
      {
        status: validationErrorStatus,
        message: 'Ошибка валидации',
        errors: errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
