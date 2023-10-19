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

  @Column()
  artist: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // TODO: add more columns here to match
}
