import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserModel from './User.model';

@Entity({ name: 'Post' })
export default class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string | null;

  @Column({ type: 'text', nullable: true })
  descriptions: string;

  @ManyToOne(() => UserModel, (user) => user.lastUpdatedPosts)
  @JoinColumn({ name: 'lastUpdateUserId' })
  lastUpdateByUser: UserModel;

  @ManyToOne(() => UserModel, (user) => user.createdPosts)
  @JoinColumn({ name: 'createUserId' })
  createByUser: UserModel;
}
