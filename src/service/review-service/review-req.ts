import {
  IS_EMAIL,
  IS_NUMBER,
  IS_PHONE,
  IS_REQUIRED,
  ObjectValidator,
} from 'common-abstract-fares-system'

import { IS_PRODUCT_ID } from './custom-validation/IS_PRODUCT_ID'
import { ReviewVariantType } from '@/src/repository/review-repository/review-entity'

export class ReviewRequest {
  productId: string = ''

  variantId: { id: string; type: ReviewVariantType }[] = []

  email: string = ''

  comment: string = ''

  phone: string = ''

  name: string = ''

  score: number = 0
}

export const ReviewReqValidator: ObjectValidator<ReviewRequest> = {
  productId: IS_PRODUCT_ID,
  variantId: IS_REQUIRED,
  email: IS_EMAIL,
  phone: IS_PHONE,
  comment: IS_REQUIRED,
  name: IS_REQUIRED,
  score: IS_NUMBER,
}

export type ReviewRequestError = Record<keyof ReviewRequest, string>
