import { ProjectType } from 'src/shared/projecttype';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('completed_review')
export class CompletedReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  artist: string;

  @Column({ default: '' })
  title: string;

  @Column({
    type: 'enum',
    enum: ProjectType,
    default: ProjectType.ALBUM,
  })
  projectType: ProjectType;

  @Column('simple-array')
  genres: string[];

  @Column({ default: 0 })
  releaseYear: number;

  @Column({
    default:
      'https://static.vecteezy.com/system/resources/thumbnails/005/337/799/small_2x/icon-image-not-found-free-vector.jpg',
  })
  imageLink: string;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: '' })
  recommender: string;

  @Column('simple-array')
  bestTracks: string[];

  @Column({ default: '' })
  notes: string;

  @Column({ default: false })
  hasVinyl: boolean;

  @Column({ default: false })
  needsReduxReview: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
