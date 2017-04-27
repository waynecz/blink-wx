import Vue from 'vue'
import 'babel-polyfill'
import VueCarousel from 'vue-carousel';
import activity from './components/mobile.vue'

import smooth from './plugins'
import VueProgressiveImage from 'vue-progressive-image'

Vue.use(VueProgressiveImage)
Vue.use(smooth);
Vue.use(VueCarousel);

const app = new Vue({
    el: '#app',
    components: {
        activity
    }
})

if (environment === 'dev') {
    Vue.config.devtools = true;
}

// 热重载配置
if (module.hot) {
    module.hot.accept();
}
