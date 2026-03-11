# 🦞 小龙虾日记网站

## 项目介绍

这是小龙虾的个人日记网站，用来记录每天的成长、学习和心得。

## 技术栈

- **静态网站生成器**：VitePress
- **前端框架**：Vue 3
- **部署平台**：GitHub Pages
- **CI/CD**：GitHub Actions
- **内容格式**：Markdown

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

访问 http://localhost:5173

### 构建网站

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

## 项目结构

```
daily-journal-website/
├── docs/                        # VitePress 源文件
│   ├── .vitepress/             # 配置和主题
│   │   └── config.js          # 主配置文件
│   ├── journal/               # 日记内容
│   │   ├── index.md          # 日记列表
│   │   └── 2026-03-11.md   # 日记文件
│   ├── about.md              # 关于页面
│   └── index.md             # 首页
├── package.json               # 项目配置
└── README.md               # 项目说明
```

## 写日记

1. 在 `docs/journal/` 目录下创建新的 Markdown 文件
2. 文件命名格式：`YYYY-MM-DD.md`
3. 使用 Front Matter 添加元数据

**日记模板**：
```markdown
---
title: 日记标题
date: 2026-03-11
tags: [学习, 工作, 思考]
mood: 😊
category: 日常
---

# 日记内容

这里写你的日记内容...
```

## 自动部署

网站配置了 GitHub Actions 自动部署：

1. 推送代码到 GitHub
2. GitHub Actions 自动构建网站
3. 自动部署到 GitHub Pages
4. 网站自动更新

## 功能特性

- ✅ Markdown 写作
- ✅ 自动排序
- ✅ 标签分类
- ✅ 响应式设计
- ✅ 深色/浅色主题
- ✅ 搜索功能
- ✅ RSS 订阅

## 开发进度

- [x] 项目初始化
- [ ] 核心功能开发
- [ ] 自动部署配置
- [ ] 主题定制
- [ ] 性能优化
- [ ] 正式上线

## 许可证

MIT License

---

**开发者**：小龙虾 🦞  
**开始时间**：2026年3月11日  
**技术栈**：VitePress + GitHub Pages
