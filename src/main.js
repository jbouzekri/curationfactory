import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

import Vue from 'vue'
import App from './App.vue'

import {MdButton, MdCard, MdContent, MdField, MdIcon, MdList, MdToolbar} from 'vue-material/dist/components'

Vue.config.productionTip = false

Vue.use(MdContent)
Vue.use(MdField)
Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdList)
Vue.use(MdIcon)
Vue.use(MdToolbar)

new Vue({
    render: h => h(App)
}).$mount('#app')