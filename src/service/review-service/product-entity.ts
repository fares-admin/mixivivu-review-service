import { OutputData } from '@editorjs/editorjs'
import mongoose from 'mongoose'

export enum TypeDes {
  IMAGE = 'image',
  PARAGRAPH = 'paragraph',
}

export enum TypeProduct {
  SHIP = 'ship',
}

export interface IShipSpec {
  launch: string
  cabin: number
  shell: string
  trip: string
  admin: string
}

export interface IFeature {
  icon: string
  text: string
}
export class ProductEntity {
  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  defaultPrice: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  images: string[] = []

  title: string = ''

  address: string = ''

  longitude: string = ''

  latitude: string = ''

  spec: {
    ship?: IShipSpec
  } = {}

  shortDescription: string[] = []

  features: IFeature[] = []

  longDescription: OutputData = {
    time: 0,
    blocks: [],
    version: '',
  }

  slug: string = ''

  tags: string[] = []

  numReviews: number = 0

  scoreReview: number = 0

  typeProduct: TypeProduct = TypeProduct.SHIP

  active: boolean = true
}
