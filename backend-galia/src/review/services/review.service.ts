import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompletedReviewEntity } from '../models/review.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

  findById(id: number): Observable<Review> {
    return from(this.reviewRepository.findOneByOrFail({ id: id }));
  }

  createReview(review: Review): Observable<Review> {
    return from(this.reviewRepository.save(review));
  }

  updateReview(id: number, review: Review): Observable<UpdateResult> {
    return from(this.reviewRepository.update(id, review));
  }

  deleteReview(id: number): Observable<DeleteResult> {
    return from(this.reviewRepository.delete(id));
  }
}
