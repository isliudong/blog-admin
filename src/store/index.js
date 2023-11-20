import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

// app.js actions
store.app_toggleSideBar = () => store.dispatch('app/toggleSideBar')
store.app_closeSideBar = ({ withoutAnimation }) => store.dispatch('app/closeSideBar', { withoutAnimation })
store.app_toggleNavBar = () => store.dispatch('app/toggleNavBar')
store.app_closeNavBar = ({ withoutAnimation }) => store.dispatch('app/closeNavBar', { withoutAnimation })
store.app_toggleDevice = device => store.dispatch('app/toggleDevice', device)
store.app_setLanguage = language => store.dispatch('app/setLanguage', language)
store.app_setSize = size => store.dispatch('app/setSize', size)

// errorLog.js actions
store.errorLog_addErrorLog = log => store.dispatch('errorLog/addErrorLog', log)
store.errorLog_clearErrorLog = () => store.dispatch('errorLog/clearErrorLog')

// permission.js actions
store.permission_generateRoutes = roles => store.dispatch('permission/generateRoutes', roles)

// settings.js actions
store.settings_changeSetting = data => store.dispatch('settings/changeSetting', data)

// tagsView.js actions
store.tagsView_addView = view => store.dispatch('tagsView/addView', view)
store.tagsView_addVisitedView = view => store.dispatch('tagsView/addVisitedView', view)
store.tagsView_addCachedView = view => store.dispatch('tagsView/addCachedView', view)
store.tagsView_delView = view => store.dispatch('tagsView/delView', view)
store.tagsView_delVisitedView = view => store.dispatch('tagsView/delVisitedView', view)
store.tagsView_delCachedView = view => store.dispatch('tagsView/delCachedView', view)
store.tagsView_delOthersViews = view => store.dispatch('tagsView/delOthersViews', view)
store.tagsView_delOthersVisitedViews = view => store.dispatch('tagsView/delOthersVisitedViews', view)
store.tagsView_delOthersCachedViews = view => store.dispatch('tagsView/delOthersCachedViews', view)
store.tagsView_delAllViews = view => store.dispatch('tagsView/delAllViews', view)
store.tagsView_delAllVisitedViews = view => store.dispatch('tagsView/delAllVisitedViews', view)
store.tagsView_delAllCachedViews = view => store.dispatch('tagsView/delAllCachedViews', view)
store.tagsView_updateVisitedView = view => store.dispatch('tagsView/updateVisitedView', view)

// user.js actions
store.user_login = userInfo => store.dispatch('user/login', userInfo)
store.user_getInfo = () => store.dispatch('user/getInfo')
store.user_logout = () => store.dispatch('user/logout')
store.user_resetToken = () => store.dispatch('user/resetToken')
store.user_changeRoles = role => store.dispatch('user/changeRoles', role)

export default store
