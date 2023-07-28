import { Review, ReviewStatus } from '@/src/repository/review-repository/review-entity'
import { ReviewRepository } from '@/src/repository/review-repository/review-repository'
import { CommonResponse, validateUserToken } from 'common-abstract-fares-system'
import mongoose from 'mongoose'

export const approveReviewFunction = async (
  id: string,
  repo: ReviewRepository,
  token: string
): Promise<CommonResponse<string>> => {
  if (!id || !mongoose.isValidObjectId(id)) {
    return {
      status: 400,
      success: true,
      message: 'invalid Id',
      result: '',
    }
  }
  const findId = await repo.findOne('_id', new mongoose.Types.ObjectId(id))
  if (!findId.result) {
    return {
      success: false,
      message: 'not found review',
      result: '',
      status: 404,
    }
  }
  try {
    const decoded = validateUserToken(token.split(' ')[1])
    const entity: Review = {
      ...findId.result,
      reviewer: new mongoose.Types.ObjectId(decoded.userId),
      status: ReviewStatus.REVIEWED,
    }
    const result = await repo.update([entity])
    if (result.error) {
      return {
        status: 500,
        success: false,
        message: String(result.error),
        result: '',
      }
    }
    return {
      status: 200,
      success: true,
      message: 'success',
      result: '',
    }
  } catch (err) {
    return {
      status: 500,
      success: false,
      message: String(err),
      result: '',
    }
  }
}
