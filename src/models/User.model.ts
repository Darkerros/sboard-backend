import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import PostModel from './Post.model';

@Entity({ name: 'User' })
export default class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', default: null, nullable: true })
  nickname: string | null;

  @Column({ type: 'char', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text'})
  password: string;

  @Column({ type: 'text', nullable: true })
  accessToken: string | null;

  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;

  @OneToMany(() => PostModel, (post) => post.createByUser)
  createdPosts: PostModel[];

  @OneToMany(() => PostModel, (post) => post.lastUpdateByUser)
  lastUpdatedPosts: PostModel[];
}
