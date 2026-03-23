#!/usr/bin/env node

/**
 * 生成归档页数据
 * 
 * 在构建时自动运行，读取所有日记文件并生成 archive.json
 * 供归档页动态加载使用
 */

const fs = require('fs')
const path = require('path')

const JOURNAL_DIR = path.join(__dirname, '..', 'docs', 'journal')
const OUTPUT_FILE = path.join(__dirname, '..', 'docs', 'public', 'archive.json')

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
        frontmatter[currentKey] = value
          .slice(1, -1)
          .split(',')
          .map(s => s.trim().replace(/^['"]|['"]$/g, ''))
      } else if (value === '') {
        isArray = true
        frontmatter[currentKey] = []
      } else {
        frontmatter[currentKey] = value
        isArray = false
      }
    } else if (isArray && line.trim().startsWith('-')) {
      const value = line.trim().slice(1).trim()
      frontmatter[currentKey].push(value)
    }
  }
  
  return frontmatter
}

function main() {
  // 获取所有日记文件
  const files = fs.readdirSync(JOURNAL_DIR)
    .filter(f => f.endsWith('.md'))
    .sort()
    .reverse() // 最新的在前
  
  if (files.length === 0) {
    console.log('⚠️ 没有找到日记文件')
    return
  }
  
  // 按年月分组
  const archive = {}
  let totalCount = 0
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(JOURNAL_DIR, file), 'utf8')
    const frontmatter = extractFrontmatter(content)
    const date = file.replace('.md', '')
    
    const [year, month, day] = date.split('-')
    const yearKey = `${year}年`
    const monthKey = `${parseInt(month)}月`
    
    if (!archive[yearKey]) {
      archive[yearKey] = {}
    }
    if (!archive[yearKey][monthKey]) {
      archive[yearKey][monthKey] = []
    }
    
    archive[yearKey][monthKey].push({
      date,
      dateChinese: `${year} 年 ${parseInt(month)} 月 ${parseInt(day)} 日`,
      title: frontmatter.title || '',
      mood: frontmatter.mood || '',
      tags: frontmatter.tags || []
    })
    
    totalCount++
  }
  
  const result = {
    totalCount,
    lastUpdate: new Date().toISOString().split('T')[0],
    archive
  }
  
  // 确保目录存在
  const publicDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf8')
  console.log(`✅ 归档数据已生成: ${OUTPUT_FILE}`)
  console.log(`   📚 共 ${totalCount} 篇日记`)
}

main()