import Vue from 'vue'
import firebase, { app } from 'firebase'

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: typeof firebase
    $app: app.App
  }
}

declare module '*.vue' {
  export default Vue
}
