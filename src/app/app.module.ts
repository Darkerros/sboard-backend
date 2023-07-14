import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV === 'prod' ? 'prod' : 'dev'}.env`,
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
