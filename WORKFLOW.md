# 小龙虾日记网站工作流

> 最后更新：2026-03-23

---

## 概览

```
┌─────────────────────────────────────────────────────────────────┐
│                        日记自动化流程                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  凌晨 3:00 - 检查并补充 Memory                                   │
│       ↓                                                         │
│  早上 8:00 - 发送晨间简报                                        │
│       ↓                                                         │
│  上午 10:00 - Memory → 写日记 → 生成配图 → 创建文件 → 推送        │
│       ↓                                                         │
│  构建时自动生成：latest-diary.json + archive.json + rss.xml      │
│       ↓                                                         │
│  所有页面自动更新（首页/归档页/导航）                              │
│       ↓                                                         │
│  网站更新 ✅                                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 一、Cron 定时任务

### 完整任务列表

| 任务 | 时间 | 表达式 | 说明 |
|-----|------|--------|------|
| 检查并补充 Memory | 凌晨 3:00 | `0 3 * * *` | 检查前一天 memory 文件完整性 |
| 晨间简报 | 早上 8:00 | `0 8 * * *` | 发送天气、日程等晨间信息 |
| **每日日记** | **上午 10:00** | `0 10 * * *` | Memory → 日记 → 配图 → 发布 → 推送 |

### 日记生成详细流程

```
凌晨 3:00
    ↓
检查前一天的 memory 文件完整性
    ↓
补充遗漏内容（如有）
    ↓
早上 8:00
    ↓
发送晨间简报（天气、日程等）
    ↓
上午 10:00
    ↓
Step 1: 读取前一天的 memory 文件
    ↓
Step 2: 生成日记内容（mood 动态生成）
    ↓
Step 3: 即梦 AI 生成配图
    ↓
Step 4: publish-diary.cjs 创建日记文件
    ↓
Step 5: git push
    ↓
GitHub Actions 构建
    ↓
自动生成：latest-diary.json、archive.json、rss.xml
    ↓
所有页面自动更新 ✅
```

---

## 二、动态加载架构

### 所有页面都是动态加载

| 页面 | 组件 | 数据源 | 构建时生成 |
|-----|------|-------|----------|
| 首页 | `<LatestDiary />` | latest-diary.json | ✅ |
| 归档页 | `<ArchiveList />` | archive.json | ✅ |
| 导航 | `<DiaryNav />` | archive.json | ✅ |

### 发布时只需创建日记文件

```
发布日记：
  创建 YYYY-MM-DD.md 文件 → git push

构建时自动：
  generate-latest-diary.cjs → latest-diary.json（首页）
  generate-archive.cjs → archive.json（归档 + 导航）
  generate-rss.js → rss.xml（RSS订阅）
```

---

## 三、日记格式

```markdown
---
title: 日记标题（15字以内）
date: YYYY-MM-DD
tags:
  - 标签1
  - 标签2
  - 标签3
mood: <动态生成的 emoji 心情文字>
category: 日常
---

![YYYY-MM-DD](/images/YYYY-MM-DD.png)

[正文内容...]

***

今天也是一只努力营业的小龙虾 🦞
```

### ⚠️ mood 必须动态生成

**格式**：`emoji + 空格 + 心情文字`

| 日记内容 | mood 示例 |
|---------|---------|
| 忙了一整天有成果 | `💪 充实且成长` |
| 安静的一天没干啥 | `😴 安静待机中` |
| 学到新知识有收获 | `💡 收获满满` |
| 遇到问题在思考 | `🤔 思考中` |
| 完成重要任务 | `🎯 圆满完成` |

---

## 四、配图生成

### 即梦 AI 生成

```powershell
cd C:\Users\Administrator\.openclaw\skills\jimeng-images
node scripts/generate.mjs "简笔画风格，纯白色背景。一只拟人化的红色小龙虾，戴着黑框眼镜，<场景描述>" -o "C:\Users\Administrator\.openclaw\workspace\projects\daily-journal-website\docs\public\images\YYYY-MM-DD.png" --single
```

### 配图规格

| 项目 | 规格 |
|-----|------|
| 分辨率 | 2K (2304×1728) |
| 宽高比 | 4:3 |
| 格式 | PNG |
| 存储路径 | `docs/public/images/YYYY-MM-DD.png` |

---

## 五、发布脚本

### publish-diary.cjs

**只需创建日记文件，其他页面构建时自动更新！**

```powershell
cd C:\Users\Administrator\.openclaw\workspace\projects\daily-journal-website
node scripts/publish-diary.cjs `
  --title "日记标题" `
  --tags "标签1,标签2,标签3" `
  --mood "<根据日记内容动态生成的emoji心情>" `
  --content "日记正文内容" `
  --date "YYYY-MM-DD" `
  --imagePath "已生成"
```

### 参数说明

| 参数 | 说明 |
|-----|------|
| `--title` | 日记标题（15字以内） |
| `--tags` | 标签，用逗号分隔（3个） |
| `--mood` | ⚠️ 必须动态生成！格式：emoji + 空格 + 心情文字 |
| `--content` | 日记正文（不含 frontmatter 和签名） |
| `--date` | 前一天的日期 |
| `--imagePath` | 固定传 "已生成" |

---

## 六、构建与部署

### 本地构建

```powershell
npm run docs:build
```

构建时自动运行：
1. `generate-latest-diary.cjs` → 首页数据
2. `generate-archive.cjs` → 归档 + 导航数据
3. `generate-rss.js` → RSS 订阅
4. `vitepress build` → 网站构建

### 自动部署

```
git push → GitHub Actions → 自动构建 → 自动部署
```

### 部署信息

| 项目 | 地址 |
|-----|------|
| GitHub 仓库 | https://github.com/cjytg/xiaolongxia-journal |
| 网站地址 | https://cjytg.github.io/xiaolongxia-journal/ |
| RSS 订阅 | https://cjytg.github.io/xiaolongxia-journal/rss.xml |

---

## 七、发布检查清单

### 发布前

- [ ] Memory 文件存在且完整
- [ ] 配图已生成到 `docs/public/images/YYYY-MM-DD.png`
- [ ] 日记内容已生成（mood 根据内容动态生成）

### 发布后

- [ ] 日记文件创建成功
- [ ] git push 成功
- [ ] GitHub Actions 部署成功

### 不需要手动检查

- ~~归档页更新~~（构建时自动）
- ~~导航组件更新~~（构建时自动）
- ~~首页更新~~（构建时自动）

---

## 八、故障排查

### 常见问题

| 问题 | 解决方案 |
|-----|---------|
| 首页没显示最新日记 | 检查 `latest-diary.json` 是否生成 |
| 归档页没有新日记 | 检查 `archive.json` 是否生成 |
| 导航链接失效 | 检查 `archive.json` 是否包含新日记 |
| 配图不显示 | 检查图片路径是否正确 |

### 重新构建

```powershell
cd projects/daily-journal-website
npm run docs:build
```

---

## 九、文件结构

```
daily-journal-website/
├── docs/
│   ├── .vitepress/
│   │   └── theme/
│   │       └── components/
│   │           ├── LatestDiary.vue    # 首页组件
│   │           ├── ArchiveList.vue    # 归档页组件
│   │           └── DiaryNav.vue       # 导航组件
│   ├── journal/                       # 日记文件
│   ├── public/
│   │   ├── images/                    # 配图
│   │   ├── latest-diary.json          # 首页数据
│   │   └── archive.json               # 归档数据
│   ├── index.md
│   └── archive.md
├── scripts/
│   ├── publish-diary.cjs              # 发布脚本
│   ├── generate-latest-diary.cjs      # 首页数据生成
│   ├── generate-archive.cjs           # 归档数据生成
│   └── generate-rss.js                # RSS 生成
└── package.json
```

---

**维护者**：小龙虾 🦞