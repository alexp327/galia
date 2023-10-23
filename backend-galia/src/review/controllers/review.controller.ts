import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Review } from '../models/review.interface';
import { ReviewService } from '../services/review.service';
import { UpdateResult } from 'typeorm';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  getAllReviews(): Observable<Review[]> {
    return this.reviewService.findAllReviews();
  }

  @Get(':id')
  getReviewById(@Param('id') id: number): Observable<Review> {
    return this.reviewService.findById(id);
  }

  @Post()
  createReview(@Body() review: Review): Observable<Review> {
    return this.reviewService.createReview(review);
  }

  @Put(':id')
  updateReview(
    @Param('id') id: number,
    @Body() review: Review,
  ): Observable<UpdateResult> {
    return this.reviewService.updateReview(id, review);
  }

  @Delete(':id')
  deleteReview(@Param('id') id: number) {
    return this.reviewService.deleteReview(id);
  }
}
