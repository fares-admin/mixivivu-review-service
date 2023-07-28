import { InternalAuthService } from '@/src/service/internal-auth-service/internal-auth-service'
import { ReviewService } from '@/src/service/review-service/review-service'
import { wrapperEndpoint } from 'common-abstract-fares-system'
import { NextApiRequest, NextApiResponse } from 'next'

/*
    @ericchen:

    put your explanation here
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new ReviewService()
  const internalService = new InternalAuthService()
  const authResult = await internalService.authUserToken(req.headers.authorization || '')
  const isAuth = authResult.success
  const result = await wrapperEndpoint(req, 'GET', service.getListReview(req, isAuth))
  res.status(200).json(result)
}
