#!/usr/bin/env node

/**
 * 日记发布自动化脚本
 * 
 * 功能：
 * 1. 创建日记文件（带正确格式）
 * 2. 更新归档页 archive.md
 * 3. 更新导航组件 DiaryNav.vue
 * 4. 更新首页 index.md
 * 5. 可选：生成配图
 * 6. 构建网站
 * 
 * 用法：
 * node scripts/publish-diary.cjs --title "标题" --tags "标签1,标签2,标签3" --mood "emoji 心情文字" --content "日记内容"
 * 
 * ⚠️ mood 格式：emoji + 空格 + 心情文字，必须根据日记内容动态生成
 * 示例：--mood "💡 收获满满" / --mood "😴 安静待机中" / --mood "🤔 思考中"
 */

const fs = require('fs')
const path = require('path')

// 项目路径
const PROJECT_ROOT = path.join(__dirname, '..')
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs')
const JOURNAL_DIR = path.join(DOCS_DIR, 'journal')
const ARCHIVE_FILE = path.join(DOCS_DIR, 'archive.md')
const INDEX_FILE = path.join(DOCS_DIR, 'index.md')
const DIARY_NAV_FILE = path.join(DOCS_DIR, '.vitepress', 'theme', 'components', 'DiaryNav.vue')

// 日记签名格式（包含分隔线）
const SIGNATURE = `\n***\n\n今天也是一只努力营业的小龙虾 🦞`

/**
 * 解析命令行参数
 */
function parseArgs() {
  const args = process.argv.slice(2)
  const params = {}
  
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '')
    const value = args[i + 1]
    params[key] = value
  }
  
  return params
}

/**
 * 获取当前日期 YYYY-MM-DD
 */
function getTodayDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 格式化日期为中文显示
 */
function formatDateChinese(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${year} 年 ${parseInt(month)} 月 ${parseInt(day)} 日`
}

/**
 * 创建日记文件
 */
function createDiaryFile(params) {
  const { title, tags, mood, content, date, imagePath } = params
  const diaryDate = date || getTodayDate()
  const diaryPath = path.join(JOURNAL_DIR, `${diaryDate}.md`)
  
  // 解析标签
  const tagsArray = tags.split(',').map(t => t.trim())
  const tagsYaml = tagsArray.map(t => `  - ${t}`).join('\n')
  
  // 配图引用
  const imageRef = imagePath ? `\n![${diaryDate}](/images/${diaryDate}.png)\n` : ''
  
  // 日记内容（如果已经有分隔线就不再添加）
  let finalContent = content
  if (!finalContent.includes('\n***\n') && !finalContent.endsWith('***')) {
    finalContent = content.trimEnd() + SIGNATURE
  }
  
  // 生成日记文件内容
  const diaryContent = `---
title: ${title}
date: ${diaryDate}
tags:
${tagsYaml}
mood: ${mood}
category: 日常
---
${imageRef}
${finalContent}
`
  
  fs.writeFileSync(diaryPath, diaryContent, 'utf8')
  console.log(`✅ 日记文件已创建: ${diaryPath}`)
  
  return { date: diaryDate, title }
}

/**
 * 更新归档页
 */
function updateArchive(diaryInfo) {
  const { date, title, mood } = diaryInfo
  let content = fs.readFileSync(ARCHIVE_FILE, 'utf8')
  
  // 格式化日期
  const [year, month, day] = date.split('-')
  const dateChinese = `${year} 年 ${parseInt(month)} 月 ${parseInt(day)} 日`
  
  // 新条目
  const newEntry = `#### ${dateChinese}\n[${title}](/journal/${date}.md) | ${mood}\n`
  
  // 找到 ### 3月（或对应月份）的位置
  const monthPattern = `### ${parseInt(month)}月`
  const monthIndex = content.indexOf(monthPattern)
  
  if (monthIndex !== -1) {
    // 在月份标题后插入新条目
    const afterMonthTitle = content.indexOf('\n', monthIndex) + 1
    content = content.slice(0, afterMonthTitle) + '\n' + newEntry + content.slice(afterMonthTitle)
  } else {
    // 如果月份不存在，创建新的月份
    const yearPattern = `## ${year}年`
    const yearIndex = content.indexOf(yearPattern)
    
    if (yearIndex !== -1) {
      const afterYearTitle = content.indexOf('\n', yearIndex) + 1
      const newMonthSection = `\n### ${parseInt(month)}月\n\n${newEntry}`
      content = content.slice(0, afterYearTitle) + newMonthSection + content.slice(afterYearTitle)
    }
  }
  
  // 更新统计信息
  const diaryCount = (content.match(/\[.*\]\(\/journal\//g) || []).length
  content = content.replace(
    /日记总数：\d+ 篇/,
    `日记总数：${diaryCount} 篇`
  )
  
  // 更新最后更新时间
  const today = getTodayDate()
  content = content.replace(
    /最后更新：\d{4}年\d{1,2}月\d{1,2}日/,
    `最后更新：${formatDateChinese(today).replace(/ /g, '')}`
  )
  
  fs.writeFileSync(ARCHIVE_FILE, content, 'utf8')
  console.log(`✅ 归档页已更新`)
}

/**
 * 更新导航组件
 */
function updateDiaryNav(diaryInfo) {
  const { date, title } = diaryInfo
  let content = fs.readFileSync(DIARY_NAV_FILE, 'utf8')
  
  // 找到 diaryList 数组
  const listPattern = /const diaryList = \[([\s\S]*?)\]/
  const match = content.match(listPattern)
  
  if (match) {
    // 解析现有列表
    const listContent = match[1]
    
    // 检查是否已存在
    if (listContent.includes(`date: '${date}'`)) {
      console.log(`⚠️ 日记已存在于导航列表中`)
      return
    }
    
    // 新条目
    const newEntry = `  { date: '${date}', title: '${title}' },\n`
    
    // 在数组开头插入
    const newList = `[${newEntry}${listContent}]`
    content = content.replace(listPattern, `const diaryList = ${newList}`)
    
    fs.writeFileSync(DIARY_NAV_FILE, content, 'utf8')
    console.log(`✅ 导航组件已更新`)
  }
}

/**
 * 更新首页
 */
function updateIndex(diaryInfo) {
  const { date, title, mood, content } = diaryInfo
  let indexContent = fs.readFileSync(INDEX_FILE, 'utf8')
  
  // 格式化日期
  const dateChinese = formatDateChinese(date)
  
  // 提取摘要（前 150 个字符）
  const summary = content.replace(/\n/g, ' ').slice(0, 150) + '...'
  
  // 新的最新日记部分
  const newLatestSection = `## 📝 最新日记

**${dateChinese}**

[${title}](/journal/${date}.html) | ${mood}

![${date}](/images/${date}.png)

${summary}

[继续阅读 →](/journal/${date}.html)`
  
  // 替换最新日记部分
  const pattern = /## 📝 最新日记[\s\S]*?---\n\n📚/
  indexContent = indexContent.replace(pattern, `${newLatestSection}\n\n---\n\n📚`)
  
  fs.writeFileSync(INDEX_FILE, indexContent, 'utf8')
  console.log(`✅ 首页已更新`)
}

/**
 * 主函数
 */
function main() {
  const params = parseArgs()
  
  // 参数校验
  if (!params.title) {
    console.error('❌ 缺少标题参数 --title')
    process.exit(1)
  }
  if (!params.tags) {
    console.error('❌ 缺少标签参数 --tags')
    process.exit(1)
  }
  if (!params.mood) {
    console.error('❌ 缺少心情参数 --mood')
    process.exit(1)
  }
  if (!params.content) {
    console.error('❌ 缺少内容参数 --content')
    process.exit(1)
  }
  
  console.log('🦞 开始发布日记...\n')
  
  // 创建日记文件
  const diaryInfo = createDiaryFile(params)
  diaryInfo.mood = params.mood
  diaryInfo.content = params.content
  
  // 更新各文件
  updateArchive(diaryInfo)
  updateDiaryNav(diaryInfo)
  updateIndex(diaryInfo)
  
  console.log('\n🎉 日记发布完成！')
  console.log(`\n📝 下一步：`)
  console.log(`   1. 检查生成的文件`)
  console.log(`   2. 运行 npm run docs:build 构建`)
  console.log(`   3. 运行 npm run docs:preview 预览`)
}

main()