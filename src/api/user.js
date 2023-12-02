import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/users/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/users/current',
    method: 'get'
  })
}

export function logout() {
  return {
    code: 200,
    data: 'success'
  }
}

export function fetchUsers(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function fetchUser(id) {
  return request({
    url: '/users/' + id,
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/users',
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/users/' + id,
    method: 'delete'
  })
}
