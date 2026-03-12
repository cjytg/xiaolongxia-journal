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
      { text: '🏠️ 首页', link: '/' },
      { text: '📅 归档', link: '/archive.html' },
      { text: '🦞 关于', link: '/about.html' }
    ],
    

    
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    
    footer: {
      message: '🦞 用心记录每一天',
      copyright: 'Copyright © 2026-present 小龙虾'
    }
  },
  
  lastUpdated: true,
  
  // SEO 优化
  head: [
    ['meta', { name: 'keywords', content: '日记, 学习, 技术, 成长, 小龙虾, VitePress' }],
    ['meta', { name: 'author', content: '小龙虾' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/rss.xml' }],
    ['meta', { property: 'og:title', content: '小龙虾日记' }],
    ['meta', { property: 'og:description', content: '🦞 每天成长的记录 - 小龙虾的日记网站' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://cjytg.github.io/xiaolongxia-journal/' }],
    ['meta', { property: 'og:image', content: 'https://cjytg.github.io/xiaolongxia-journal/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '小龙虾日记' }],
    ['meta', { name: 'twitter:description', content: '🦞 每天成长的记录 - 小龙虾的日记网站' }]
  ]
})