import './assets/main.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { AUTH } from './utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
//import mitt from 'mitt'
import { VueMasonryPlugin } from "vue-masonry";

// firebase
//import { initializeApp } from 'firebase/app'

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// toasts
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const vuetify = createVuetify({
  components,
  directives,
})
let app;
onAuthStateChanged(AUTH, (user) => {
  if(!app){
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(vuetify)
    app.use(ToastPlugin)
    app.use(VueMasonryPlugin)
    app.mount('#app')
  }
})

