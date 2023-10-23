import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompletedReviewEntity } from '../models/review.entity';
import { Repository } from 'typeorm';
import { Review } from '../models/review.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(CompletedReviewEntity)
    private readonly reviewRepository: Repository<CompletedReviewEntity>,
  ) {}

  findAllReviews(): Observable<Review[]> {
    return from(this.reviewRepository.find());
  }

  createReview(review: Review): Observable<Review> {
    return from(this.reviewRepository.save(review));
  }
}
