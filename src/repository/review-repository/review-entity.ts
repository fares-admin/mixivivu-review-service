import mongoose from 'mongoose'

export enum ReviewStatus {
  OFFLINE = 'offline',
  REVIEWED = 'reviewed',
}

export enum ReviewVariantType {
  ROOM = 'room',
}

export interface ReviewVariant {
  id: mongoose.Types.ObjectId
  type: ReviewVariantType
}

export class Review {
  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  productId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  variantId: ReviewVariant[] = []

  email: string = ''

  name: string = ''

  comment: string = ''

  phone: string = ''

  score: number = 0

  reviewer: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  created: Date = new Date()

  status: ReviewStatus = ReviewStatus.OFFLINE
}

export const ReviewSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  productId: mongoose.Types.ObjectId,
  variantId: Array<{ id: mongoose.Types.ObjectId; type: String }>,
  comment: String,
  phone: String,
  email: String,
  name: String,
  score: Number,
  reviewer: mongoose.Types.ObjectId,
  created: Date,
  status: String,
})
