import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
// console.log(store)
// Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
  ...App
	
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
// 引入vuex  
import store from './store/index.js'
export function createApp() {
  const app = createSSRApp(App)
	app.use(store)
  return {
    app
  }
}
// #endif