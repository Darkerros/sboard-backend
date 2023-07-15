import { ValidationError } from '@nestjs/common';
import { ValidationException } from '@exceptions/validation.exception';

export const validationExceptionFactory = (errors: ValidationError[]) => {
  const errs = errors.reduce((errsAcc, error) => {
    errsAcc[error.property] = Object.values(error.constraints).join(', ');
    return errsAcc;
  }, {});

  return new ValidationException(errs);
};
