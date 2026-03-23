// 小龙虾日记 - 自定义主题入口
import DefaultTheme from 'vitepress/theme'
import './styles/custom.css'
import SocialShare from './components/SocialShare.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('SocialShare', SocialShare)
  }
}