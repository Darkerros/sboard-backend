import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@modules/auth/auth.module';

import PostModel from '@models/Post.model';

import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostModel]), AuthModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
