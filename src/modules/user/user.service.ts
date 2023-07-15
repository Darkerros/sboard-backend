import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserModel from '../../models/User.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';

type TUserTokens = Promise<
  Omit<
    UserModel,
    'nickname' | 'email' | 'password' | 'createdPosts' | 'lastUpdatedPosts'
  >
>;

@Injectable()
export class UserService {
  @InjectRepository(UserModel)
  private userRepository: Repository<UserModel>;

  async getUserById(userId: number) {
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async getUserTokens(userId: number): Promise<TUserTokens> {
    return await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'accessToken', 'refreshToken'],
    });
  }

  async getUserInfo(userId: number) {
    return await this.userRepository.findOne({
      select: ['id', 'email', 'nickname'],
      where: { id: userId },
    });
  }

  async createUser(dto: CreateUserDto) {
    const userToCreate = this.userRepository.create(dto);
    return await this.userRepository.save(userToCreate);
  }

  async updateUser({ userId, ...userDataToUpdate }: UpdateUserDto) {
    return await this.userRepository.update({ id: userId }, userDataToUpdate);
  }
}
