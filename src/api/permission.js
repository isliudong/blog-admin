import request from '@/utils/request'

export function getApis(query) {
  return request({
    url: '/permissions',
    method: 'get',
    params: query
  })
}
export function updateAuthority(data) {
  return request({
    url: '/roles/permission',
    method: 'put',
    data
  })
}

