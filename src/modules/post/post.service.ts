import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import PostModel from '@models/Post.model';
import UserModel from '@models/User.model';

import { CreatePostDto } from '@modules/post/dto/create-post.dto';
import { UpdatePostDto } from '@modules/post/dto/update-post.dto';
import { GetPostDto } from '@modules/post/dto/get-post.dto';

@Injectable()
export class PostService {
  @InjectRepository(PostModel)
  private postRepository: Repository<PostModel>;

  async createPost(dto: CreatePostDto, user: UserModel) {
    const postToCreate = this.postRepository.create({
      ...dto,
      lastUpdateByUser: user,
      createByUser: user,
    });

    const createPost = await this.postRepository.save(postToCreate);
    return await this.postRepository.findOneBy({ id: createPost.id });
  }

  async updatePost({ postId, ...dto }: UpdatePostDto, user: UserModel) {
    const postToUpdate = await this.postRepository.update(
      { id: postId },
      {
        ...dto,
        lastUpdateByUser: user,
      },
    );

    if (!postToUpdate.affected) {
      throw new NotFoundException('Пост не обновлен');
    }

    return await this.postRepository.findOneBy({ id: postId });
  }

  async deletePost(postId: number) {
    const postToDelete = await this.postRepository.findOneBy({ id: postId });
    if (!postToDelete) {
      throw new NotFoundException('Пост не найден');
    }

    await this.postRepository.delete(postToDelete);
  }

  async getPost(dto: GetPostDto) {
    const page = dto?.page ? dto.page - 1 : 0;
    const limit = dto?.limit ? dto.limit : 20;
    const offset = page * limit ?? 0;

    const filter: FindOptionsWhere<PostModel> | FindOptionsWhere<PostModel>[] =
      dto.query
        ? [
            { title: ILike(`%${dto.query}%`) },
            { description: ILike(`%${dto.query}%`) },
          ]
        : [];

    const postCountPromise = this.postRepository.count({
      where: filter,
    });

    const postPromiseList = this.postRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
        lastUpdateByUser: {
          id: true,
          nickname: true,
          email: true,
        },
        createByUser: {
          id: true,
          nickname: true,
          email: true,
        },
      },
      where: filter,
      relations: {
        lastUpdateByUser: true,
        createByUser: true,
      },
      take: limit,
      skip: offset,
    });

    const [postCount, postList] = await Promise.all([
      postCountPromise,
      postPromiseList,
    ]);

    return {
      postCount: postCount,
      pagesCount: Math.ceil(postCount / limit),
      posts: postList,
    };
  }
}
