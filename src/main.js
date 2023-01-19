import './style.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import router from "@/router"

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersist)

app.use(ElementPlus).use(router).use(pinia)
app.mount('#app')
