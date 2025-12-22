import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ElementPlusBiz from '../../src/index'
import App from './App.vue'

const app = createApp(App)

// 注册 Element Plus
app.use(ElementPlus)

// 注册 Element Plus Biz 组件库
app.use(ElementPlusBiz)

app.mount('#app')