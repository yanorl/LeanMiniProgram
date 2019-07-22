import RequestData from '../common/js/request.js'

export function getCategory() {
  return RequestData({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return RequestData({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return RequestData({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}

export class CreateCategory{
  constructor() {
    
  }
}