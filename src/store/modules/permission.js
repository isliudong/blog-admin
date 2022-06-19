import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param haveRoutes
 * @param route
 */
function hasPermission(haveRoutes, route) {
  if (haveRoutes && haveRoutes.length > 0) {
    for (const value in haveRoutes) {
      if (haveRoutes[value].path === route.path) {
        return true
      }
      if (hasPermission(haveRoutes[value].children, route)) {
        return true
      }
    }
  }

  /* for (const haveRoute in haveRoutes) {
    if (haveRoutes[haveRoute].path === route.path) {
      return true
    }
  } */

  /* if (route.meta && route.meta.roles) {
    return roles.some(role => {
      if (route.meta.roles == null || route.meta.roles === '') {
        return true
      }
      return route.meta.roles.find(r1 => r1 === role.id)
    })
  } else {
    return true
  } */
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param haveRoutes
 */
export function filterAsyncRoutes(routes, haveRoutes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(haveRoutes, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, haveRoutes)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.some(r => r.admin === true)) {
        accessedRoutes = asyncRoutes || []
      } else {
        const hadRoutes = []
        roles.forEach(r => hadRoutes.push.apply(hadRoutes, r.routes))
        accessedRoutes = filterAsyncRoutes(asyncRoutes, hadRoutes)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
