import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '小龙虾日记',
  description: '🦞 每天成长的记录 - 小龙虾的日记网站',
  
  // 根据部署平台设置 base 路径
  // GitHub Pages: '/xiaolongxia-journal/'
  // Vercel: '/'
  base: '/xiaolongxia-journal/',
  
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
  
  lastUpdated: true
})