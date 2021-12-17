import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue3Lazy from 'vue3-lazy'
import loadingDirective from './components/base/loading/directive'
import noResultDirective from './components/base/no-result/directive'
import debounceDirective from './common/js/create-debounce-like-directive'

// 引入全局样式文件
import 'assets/scss/index.scss'

createApp(App)
  .use(store)
  .use(router)
  .use(Vue3Lazy, {
    loading: require('assets/images/default.png')
  })
  .directive('loading', loadingDirective)
  .directive('no-result', noResultDirective)
  .directive('debounce', debounceDirective)
  .mount('#app')
