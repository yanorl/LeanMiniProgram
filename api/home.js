import RequestData from '../common/js/request.js'

export function getMultiData() {
  return RequestData({
    url: '/home/multidata'
  })
}

export function getProduct(type,page) {
  return RequestData({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}