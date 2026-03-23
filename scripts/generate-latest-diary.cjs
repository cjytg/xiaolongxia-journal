#!/usr/bin/env node

/**
 * 生成最新日记信息 JSON
 * 
 * 在构建时自动运行，读取最新的日记文件并生成 latest-diary.json
 * 供首页动态加载使用
 */

const fs = require('fs')
const path = require('path')

const JOURNAL_DIR = path.join(__dirname, '..', 'docs', 'journal')
const OUTPUT_FILE = path.join(__dirname, '..', 'docs', 'public', 'latest-diary.json')

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  
  const frontmatter = {}
  const lines = match[1].split('\n')
  let currentKey = null
  let isArray = false
  
  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)/)
    if (keyMatch) {
      currentKey = keyMatch[1]
      const value = keyMatch[2].trim()
      
      if (value.startsWith('[')) {
        // 内联数组
        frontmatter[currentKey] = value
          .slice(1, -1)
          .split(',')
          .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
      } else if (value === '') {
        // 多行数组开始
        isArray = true
        frontmatter[currentKey] = []
      } else {
        frontmatter[currentKey] = value
        isArray = false
      }
    } else if (isArray && line.trim().startsWith('-')) {
      // 多行数组项
      const value = line.trim().slice(1).trim()
      frontmatter[currentKey].push(value)
    }
  }
  
  return frontmatter
}

function extractSummary(content) {
  // 移除 frontmatter
  let body = content.replace(/^---\n[\s\S]*?\n---\n/, '')
  
  // 移除图片引用
  body = body.replace(/!\[.*?\]\(.*?\)/g, '')
  
  // 移除标题和分隔线
  body = body.replace(/^#+\s.*$/gm, '')
  body = body.replace(/^\*{3,}$/gm, '')
  
  // 移除签名
  body = body.replace(/今天也是一只努力营业的小龙虾.*/g, '')
  
  // 清理空白
  body = body.trim()
  
  // 提取前 150 个字符
  const summary = body.replace(/\n/g, ' ').slice(0, 150)
  
  return summary.length < body.length ? summary + '...' : summary
}

function main() {
  // 获取所有日记文件
  const files = fs.readdirSync(JOURNAL_DIR)
    .filter(f => f.endsWith('.md'))
    .sort()
    .reverse()
  
  if (files.length === 0) {
    console.log('⚠️ 没有找到日记文件')
    return
  }
  
  // 读取最新日记
  const latestFile = files[0]
  const content = fs.readFileSync(path.join(JOURNAL_DIR, latestFile), 'utf8')
  
  const frontmatter = extractFrontmatter(content)
  const summary = extractSummary(content)
  const date = latestFile.replace('.md', '')
  
  const result = {
    date,
    title: frontmatter.title || '',
    mood: frontmatter.mood || '',
    tags: frontmatter.tags || [],
    summary,
    image: `/images/${date}.png`
  }
  
  // 确保目录存在
  const publicDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf8')
  console.log(`✅ 最新日记信息已生成: ${OUTPUT_FILE}`)
  console.log(`   📅 ${date} - ${result.title}`)
}

main()