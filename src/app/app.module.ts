import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModel from '../models/User.model';
import PostModel from '../models/Post.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV === 'prod' ? 'prod' : 'dev'}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        UserModel,
        PostModel
      ],
      synchronize: true,
      autoLoadEntities: true,
      dropSchema: false
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
