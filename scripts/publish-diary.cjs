#!/usr/bin/env node

/**
 * 日记发布自动化脚本
 * 
 * 功能：创建日记文件（带正确格式）
 * 
 * 其他页面现在都是动态加载：
 * - 首页：LatestDiary.vue（构建时生成 latest-diary.json）
 * - 归档页：ArchiveList.vue（构建时生成 archive.json）
 * - 导航：DiaryNav.vue（从 archive.json 动态加载）
 * 
 * 用法：
 * node scripts/publish-diary.cjs --title "标题" --tags "标签1,标签2,标签3" --mood "<动态生成>" --content "日记内容"
 * 
 * ⚠️ mood 必须根据日记内容动态生成！
 * 格式：emoji + 空格 + 心情文字
 * 正确示例：
 *   --mood "💪 充实且成长"（忙了一整天有成果）
 *   --mood "😴 安静待机中"（安静的一天）
 *   --mood "💡 收获满满"（学到新知识）
 *   --mood "🤔 思考中"（遇到问题在思考）
 */

const fs = require('fs')
const path = require('path')

// 项目路径
const PROJECT_ROOT = path.join(__dirname, '..')
const JOURNAL_DIR = path.join(PROJECT_ROOT, 'docs', 'journal')

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
  createDiaryFile(params)
  
  console.log('\n🎉 日记发布完成！')
  console.log(`\n📝 下一步：`)
  console.log(`   1. 检查生成的日记文件`)
  console.log(`   2. 运行 npm run docs:build 构建（自动更新首页、归档页、导航）`)
  console.log(`   3. git push 推送到 GitHub`)
}

main()