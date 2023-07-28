import { Review } from '@/src/repository/review-repository/review-entity'
import { ReviewRepository } from '@/src/repository/review-repository/review-repository'
import axios from 'axios'
import { CommonResponse, generateServiceToken, validate } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { ProductEntity, TypeProduct } from '../product-entity'
import { ReviewReqValidator, ReviewRequest, ReviewRequestError } from '../review-req'
import { Room } from '../room-entity'

/*
      @ericchen:
  
      put your explanation here
  */

export const addNewReviewFunction = async (
  req: ReviewRequest,
  repository: ReviewRepository
): Promise<CommonResponse<ReviewRequestError | string>> => {
  const validateRes = await validate(req, ReviewReqValidator)
  if (validateRes.isError) {
    return {
      success: false,
      result: {
        ...validateRes.error,
      },
      message: 'invalidRequest',
      status: 400,
    }
  }
  const res = {
    success: false,
    message: '',
    result: {
      productId: '',
      variantId: '',
      email: '',
      name: '',
      score: '',
      reviewer: '',
    },
    status: 400,
  }
  if (!mongoose.isValidObjectId(req.productId)) {
    return {
      ...res,
      message: '',
      result: { ...res.result, productId: 'invalid productId' },
    }
  }
  const internalToken = generateServiceToken({ serviceName: process.env.SERVICE_NAME || '' })
  const callInternalProduct = await axios.get(
    `${process.env.PRODUCT_SERVICE_URL}/api/service/find-product?id=${req.productId}&ServiceToken=${internalToken}`
  )
  if (callInternalProduct.status !== 200)
    return {
      status: 500,
      message: 'server error',
      result: '',
      success: false,
    }
  const result = callInternalProduct.data as CommonResponse<ProductEntity>
  const variantList = await Promise.all(
    req.variantId.map(async (item) => {
      if (
        item.length > 0 &&
        result.result.typeProduct === TypeProduct.SHIP &&
        mongoose.isValidObjectId(item)
      ) {
        const callInternalRoom = await axios.get(
          `${process.env.ROOM_SERVICE_URL}/api/service/find-room?id=${item}&ServiceToken=${internalToken}`
        )
        if (callInternalRoom.status === 200) {
          const result = callInternalProduct.data as CommonResponse<Room>
          if (result.success) {
            return item
          }
        }
      }
      return ''
    })
  )
  const entity: Review = {
    ...new Review(),
    ...req,
    reviewer: new mongoose.Types.ObjectId(),
    variantId: variantList
      .filter((item) => item.length > 0)
      .map((item) => new mongoose.Types.ObjectId(item)),
    productId: new mongoose.Types.ObjectId(req.productId),
  }

  const { error } = await repository.insert([{ ...entity }])
  if (error) {
    return {
      status: 500,
      message: error || '',
      result: '',
      success: false,
    }
  }
  return {
    status: 200,
    message: 'ok',
    result: '',
    success: true,
  }
}
