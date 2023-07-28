import { Review, ReviewStatus } from '@/src/repository/review-repository/review-entity'
import { ReviewRepository } from '@/src/repository/review-repository/review-repository'
import { CommonListResult, CommonResponse, CommonService } from 'common-abstract-fares-system'
import { NextApiRequest } from 'next'
import { PrivateReviewRes } from './review-private-res'
import { PublicReviewRes } from './review-public-res'
import { ReviewRequest, ReviewRequestError } from './review-req'
import {
  addNewReviewFunction,
  approveReviewFunction,
  deleteReviewFunction,
  getListReviewFunc,
} from './review-service-function'

export class ReviewService extends CommonService<ReviewRepository> {
  constructor() {
    super(new ReviewRepository())
  }

  public async getListReview(
    req: NextApiRequest,
    isAuth: boolean
  ): Promise<CommonResponse<CommonListResult<PublicReviewRes | PrivateReviewRes> | string>> {
    return await getListReviewFunc(
      req,
      this.repository,
      this.getPageAndSize,
      this.generatePipelineAggregate(
        isAuth ? req.query : { ...req.query, status: ReviewStatus.REVIEWED },
        new Review()
      ),
      isAuth
    )
  }

  public async addNewReview(
    req: ReviewRequest
  ): Promise<CommonResponse<ReviewRequestError | string>> {
    return await addNewReviewFunction(req, this.repository)
  }

  public async deleteReview(ids: string): Promise<CommonResponse<string>> {
    return await deleteReviewFunction(ids, this.repository)
  }

  public async approveReview(id: string, token: string): Promise<CommonResponse<string>> {
    return await approveReviewFunction(id, this.repository, token)
  }
}
