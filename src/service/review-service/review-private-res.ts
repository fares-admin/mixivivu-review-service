import { ReviewStatus } from '@/src/repository/review-repository/review-entity'
import mongoose from 'mongoose'
import { PublicReviewRes } from './review-public-res'

export class PrivateReviewRes extends PublicReviewRes {
  reviewer: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  status: ReviewStatus = ReviewStatus.OFFLINE
}
