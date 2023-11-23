import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/api-request-audits',
    method: 'get',
    params: query
  })
}
