import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompletedReviewEntity } from './models/review.entity';
import { ReviewController } from './controllers/review.controller';
import { ReviewService } from './services/review.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompletedReviewEntity])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
