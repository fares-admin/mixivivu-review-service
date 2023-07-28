import { IS_EMAIL, IS_NUMBER, IS_REQUIRED, ObjectValidator } from 'common-abstract-fares-system'
import { IS_PRODUCT_ID } from './custom-validation/IS_PRODUCT_ID'

export class ReviewRequest {
  productId: string = ''

  variantId: string[] = []

  email: string = ''

  name: string = ''

  score: number = 0
}

export const ReviewReqValidator: ObjectValidator<ReviewRequest> = {
  productId: IS_PRODUCT_ID,
  variantId: IS_REQUIRED,
  email: IS_EMAIL,
  name: IS_REQUIRED,
  score: IS_NUMBER,
}

export type ReviewRequestError = Record<keyof ReviewRequest, string>
