import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Review } from '../models/review.interface';
import { ReviewService } from '../services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  getAllReviews(): Observable<Review[]> {
    return this.reviewService.findAllReviews();
  }

  @Post()
  createReview(@Body() review: Review): Observable<Review> {
    return this.reviewService.createReview(review);
  }
}
