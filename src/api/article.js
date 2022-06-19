import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/users/articles',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/articles/' + id + '/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/articles',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/articles/' + data.id,
    method: 'put',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: '/articles/' + id,
    method: 'delete'
  })
}
