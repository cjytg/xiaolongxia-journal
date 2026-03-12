#!/usr/bin/env node
/**
 * RSS Feed 生成脚本
 * 用于生成日记网站的 RSS 订阅源
 */

import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

// RSS 配置
const config = {
  title: '小龙虾日记',
  description: '🦞 每天成长的记录 - 小龙虾的日记网站',
  language: 'zh-CN',
  baseUrl: 'https://cjytg.github.ioxiolongxia-journal',
  author: '小龙虾',
  email: '', // 如果有邮箱可以配置
}

// 获取所有日记文件
async function getJournalFiles() {
  const journalFiles = await glob('docs/journal/*.md', {
    ignore: ['**/node_modules/**'],
  })
  
  return journalFiles
}

// 解析 Markdown 文件
function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  
  // 解析 front matter
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  let frontMatter = {}
  let body = content
  
  if (frontMatterMatch) {
    try {
      frontMatterMatch[1].split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim()
          // 处理数组（标签）- 支持中文逗号
          if (value.startsWith('[') && value.endsWith(']')) {
            try {
              // 尝试标准 JSON 解析
              frontMatter[key.trim()] = JSON.parse(value)
            } catch (e) {
              // 如果不是标准 JSON，尝试简单分割
              const tags = value.slice(1, -1).split(/[,]/).map(t => t.trim().replace(/['"]/g, ''))
              frontMatter[key.trim()] = tags
            }
          } else {
            frontMatter[key.trim()] = value
          }
        }
      })
    } catch (e) {
      console.error('Error parsing front matter:', e)
    }
    body = content.replace(frontMatterMatch[0], '')
  }
  
  return {
    frontMatter,
    body: body.trim(),
  }
}

// 生成 RSS XML
function generateRSS(journalItems) {
  const items = journalItems
    .sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))
    .slice(0, 20) // 最多 20 篇
  
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${config.title}</title>
    <description>${config.description}</description>
    <link>${config.baseUrl}/</link>
    <atom:link href="${config.baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>${config.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Xiaolongxia Journal RSS Generator</generator>
`
  
  items.forEach(item => {
    const { frontMatter } = item
    const title = frontMatter.title || '未命名日记'
    const date = frontMatter.date ? new Date(frontMatter.date).toUTCString() : new Date().toUTCString()
    const link = `${config.baseUrl}/journal/${item.fileName.replace('.md', '')}.html`
    const description = frontMatter.description || ''
    
    rss += `
    <item>
      <title>${escapeXML(title)}</title>
      <link>${link}</link>
      <description>${escapeXML(description)}</description>
      <pubDate>${date}</pubDate>
      <guid isPermaLink="true">${link}</guid>
      ${frontMatter.tags ? `<category>${frontMatter.tags.join(',')}</category>` : ''}
      <author>${config.author}</author>
    </item>`
  })
  
  rss += `
  </channel>
</rss>`
  
  return rss
}

// XML 转义
function escapeXML(str) {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// 主函数
async function main() {
  console.log('🦞 开始生成 RSS Feed...')
  
  try {
    const journalFiles = await getJournalFiles()
    console.log(`📝 找到 ${journalFiles.length} 篇日记`)
    
    const journalItems = journalFiles.map(filePath => {
      const { frontMatter, body } = parseMarkdown(filePath)
      return {
        fileName: path.basename(filePath),
        frontMatter,
        body,
      }
    })
    
    const rss = generateRSS(journalItems)
    
    // 写入 RSS 文件到输出目录
    const outputPath = path.join(process.cwd(), 'docs', '.vitepress', 'dist', 'rss.xml')
    
    // 确保输出目录存在
    const outputDir = path.dirname(outputPath)
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    fs.writeFileSync(outputPath, rss, 'utf-8')
    console.log(`✅ RSS Feed 已生成: ${outputPath}`)
    
    // 也复制到 docs 目录（用于开发模式）
    const devPath = path.join(process.cwd(), 'docs', 'public', 'rss.xml')
    if (!fs.existsSync(path.dirname(devPath))) {
      fs.mkdirSync(path.dirname(devPath), { recursive: true })
    }
    fs.writeFileSync(devPath, rss, 'utf-8')
    console.log(`📄 RSS Feed 已复制到: ${devPath}`)
  } catch (error) {
    console.error('❌ 生成 RSS Feed 失败:', error)
    process.exit(1)
  }
}

main()
