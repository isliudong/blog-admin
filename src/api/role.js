import request from '@/utils/request'
import { deepClone } from '@/utils'
import { asyncRoutes, constantRoutes } from '../../mock/role/routes'
import Mock from 'mockjs'

export function getRoutes() {
  /* return  deepClone([...constantRoutes, ...asyncRoutes]) */

  return request({
    url: '/routes/list',
    method: 'get'
  })
}

export function refreshRoutes(data) {
  return request({
    url: '/routes/list',
    method: 'put',
    data
  })
}

export function getRoles(query) {
  return request({
    url: '/roles',
    method: 'get',
    params: query
  })
}

export function addRole(data) {
  /* return {
    key: Mock.mock('@integer(300, 5000)')
  } */
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
  /* return request({
    url: `/roles/${id}`,
    method: 'put',
    data
  }) */
}

export function deleteRole(data) {
  return request({
    url: `/roles`,
    method: 'delete',
    data
  })
}

export function selectRolesHasPermission(query) {
  return request({
    url: '/roles/has-permission',
    method: 'get',
    params: query
  })
}

export function selectRolesWithoutPermission(query) {
  return request({
    url: '/roles/without-permission',
    method: 'get',
    params: query
  })
}
