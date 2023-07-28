import { CommonRepository } from 'common-abstract-fares-system'
import { Review, ReviewSchema } from './review-entity'

export class ReviewRepository extends CommonRepository<Review> {
  constructor() {
    super(ReviewSchema, 'reviews')
  }
}
