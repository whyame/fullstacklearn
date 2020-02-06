import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import './plugins/avue'
import router from './router'
import Axios from 'axios'
import EleForm from 'vue-ele-form'
// avue自带表格表单生成
Vue.use(EleForm)

Vue.config.productionTip = false

Vue.prototype.$http = Axios.create({
  baseURL: 'http://localhost:3000'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
