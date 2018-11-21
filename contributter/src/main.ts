import Vue from 'vue'
import Application from './Application.vue'
import router from './router'
import firebase from 'firebase'
Vue.config.productionTip = false

interface CustomEnvironment {
  VUE_APP_FIREBASE_APIKEY: string
  VUE_APP_FIREBASE_AUTHDOMAIN: string
  VUE_APP_FIREBASE_DATABASEURL: string
  VUE_APP_FIREBASE_PROJECTID: string
  VUE_APP_FIREBASE_STORAGEBUCKET: string
  VUE_APP_FIREBASE_MESSAGINGSENDERID: string
}

const env = (process.env as any) as CustomEnvironment

const app = firebase.initializeApp({
  apiKey: env.VUE_APP_FIREBASE_APIKEY,
  authDomain: env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: env.VUE_APP_FIREBASE_MESSAGINGSENDERID
})
;(window as any).firebase = firebase

Vue.prototype.$firebase = firebase
Vue.prototype.$app = app

new Vue({
  router,
  render: h => h(Application)
}).$mount('#app')
