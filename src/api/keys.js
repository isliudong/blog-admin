import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/api-keys',
    method: 'get',
    params: query
  })
}

export function importKeys(data) {
  return request({
    url: '/v1/user-api-keys',
    method: 'post',
    data
  })
}
