import { ReviewRepository } from '@/src/repository/review-repository/review-repository'
import { CommonListResult, CommonResponse } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { NextApiRequest } from 'next'
import { PrivateReviewRes } from '../review-private-res'
import { PublicReviewRes } from '../review-public-res'

/*
      @ericchen:
  
      put your explanation here
  */

export const getListReviewFunc = async (
  req: NextApiRequest,
  repository: ReviewRepository,
  getPageAndSize: (req: {
    query: {
      page: number
      size: number
    }
  }) => {
    page: number
    size: number
  },
  pipelines: mongoose.PipelineStage[],
  isAuth: boolean
): Promise<CommonResponse<CommonListResult<PublicReviewRes | PrivateReviewRes> | string>> => {
  const { page, size } = getPageAndSize(req as any)
  const result = await repository.find(page, size, pipelines)
  if (!result.result) {
    return {
      status: 500,
      message: 'sv error',
      success: true,
      result: '',
    }
  }
  if (isAuth) {
    return {
      status: 200,
      message: 'ok',
      success: true,
      result: {
        ...result.result,
        data: result.result.data.map((item) => {
          return {
            ...item,
            _id: item._id.toString(),
            productId: item.productId.toString(),
            variantId: item.variantId.map((item) => item.toString()),
          }
        }),
      },
    }
  }
  return {
    status: 200,
    message: 'ok',
    success: true,
    result: {
      ...result.result,
      data: result.result.data.map((item) => {
        return {
          ...item,
          _id: item._id.toString(),
          productId: item.productId.toString(),
          variantId: item.variantId.map((item) => item.toString()),
          status: undefined,
        }
      }),
    },
  }
}
