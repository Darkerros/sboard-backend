import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { ValidationPipe } from '@nestjs/common';
import { validationExceptionFactory } from './factory/validation-exception-factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ exceptionFactory: validationExceptionFactory }),
  );

  app.enableCors({});

  const APP_PORT = process.env.PORT;
  await app.listen(APP_PORT, () => {
    console.log(`Start on: ${APP_PORT}`);
  });
}

bootstrap();
