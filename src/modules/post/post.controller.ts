import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@modules/auth/auth.guard';
import { AuthUser } from '@decorators/auth-user.decorator';
import { CreatePostDto } from '@modules/post/dto/create-post.dto';

import UserModel from '@models/User.model';

import { PostService } from '@modules/post/post.service';
import { UpdatePostDto } from '@modules/post/dto/update-post.dto';
import { GetPostDto } from '@modules/post/dto/get-post.dto';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
  @Inject()
  private postService: PostService;

  @Get('/list')
  async getPosts(@Query() dto: GetPostDto) {
    return await this.postService.getPost(dto);
  }

  @Post('/create')
  async createPost(@Body() dto: CreatePostDto, @AuthUser() user: UserModel) {
    return await this.postService.createPost(dto, user);
  }

  @Post('/update')
  async updatePost(@Body() dto: UpdatePostDto, @AuthUser() user: UserModel) {
    return await this.postService.updatePost(dto, user);
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: number) {
    return await this.postService.deletePost(id);
  }
}
