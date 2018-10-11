import request from '@/utils/request'

export function price_distribute(query) {
  return request({
    url: '/v1/stock/price_distribute/',
    method: 'get',
    params: query
  })
}
