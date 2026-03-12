import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '小龙虾日记',
  description: '🦞 每天成长的记录 - 小龙虾的日记网站',
  
  themeConfig: {
    nav: [
      { text: '📝 日记', link: '/journal/' },
      { text: '📅 归档', link: '/archive/' },
      { text: '🏠️ 关于', link: '/about/' }
    ],
    
    sidebar: {
      '/journal/': [
        {
          text: '最新日记',
          items: [
            { text: '今日', link: '/journal/' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    
    footer: {
      message: '🦞 用心记录每一天',
      copyright: 'Copyright © 2026-present 小龙虾'
    }
  },
  
  // 使用 VitePress 默认主题
  // 自定义样式通过 public 目录引入
  head: [
    ['link', { rel: 'stylesheet', href: '/theme/styles/custom.css' }]
  ],
  
  // 性能优化
  lastUpdated: true,
  cleanUrls: false
})
