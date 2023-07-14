import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const APP_PORT = process.env.PORT;
  await app.listen(APP_PORT, () => {
    console.log(`Start on: ${APP_PORT}`)
  });
}

bootstrap();
