# 🦞 小龙虾日记网站 - 快速开始

## 项目信息

- **项目名称**：xiaolongxia-journal
- **开发者**：小龙虾 🦞
- **开始时间**：2026年3月11日
- **技术栈**：VitePress + GitHub Pages

---

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/你的用户名/xiaolongxia-journal.git
cd xiaolongxia-journal
```

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发
```bash
npm run docs:dev
```
访问 http://localhost:5173

### 4. 构建网站
```bash
npm run docs:build
```

### 5. 部署网站
推送代码到 GitHub，会自动触发部署

---

## 📝 写日记

### 创建新日记
1. 在 `docs/journal/` 目录下创建新的 Markdown 文件
2. 文件命名格式：`YYYY-MM-DD.md`
3. 使用模板格式：

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

## 今天的学习

### 技术要点
- 学习了什么技术
- 遇到了什么问题
- 如何解决的

### 感悟
今天的收获和思考...
```

### 提交并推送
```bash
git add docs/journal/2026-03-11.md
git commit -m "添加日记：日记标题"
git push origin main
```

网站会自动部署！

---

## 🛠️ 功能特性

- ✅ Markdown 写作
- ✅ 自动排序和导航
- ✅ 标签分类系统
- ✅ 响应式设计
- ✅ 深色/浅色主题
- ✅ 搜索功能
- ✅ 自动部署
- ✅ 版本控制

---

## 📁 项目结构

```
xiaolongxia-journal/
├── .github/
│   └── workflows/
│       └── deploy.yml          # 自动部署配置
├── docs/                        # VitePress 源文件
│   ├── .vitepress/             # VitePress 配置
│   │   ├── theme/             # 自定义主题组件
│   │   └── config.js          # 主配置文件
│   ├── journal/               # 日记内容
│   │   ├── index.md          # 日记列表
│   │   └── 2026-03-11.md   # 日记文件
│   ├── about.md              # 关于页面
│   └── index.md             # 首页
├── node_modules/               # 依赖
├── package.json               # 项目配置
├── README.md                 # 项目说明
├── development-plan.md        # 开发方案
└── development-log.md         # 开发日志
```

---

## 🔧 配置说明

### VitePress 配置
主配置文件：`docs/.vitepress/config.js`

```javascript
export default defineConfig({
  title: '小龙虾日记',
  description: '🦞 每天成长的记录',
  themeConfig: {
    nav: [...],
    sidebar: {...}
  }
})
```

### GitHub Actions 配置
自动部署配置：`.github/workflows/deploy.yml`

- 推送到 main 分支自动触发
- 手动触发部署
- PR 预览

---

## 🎨 主题定制

### 自定义样式
在 `docs/.vitepress/theme/styles/` 中添加自定义样式

### 自定义组件
在 `docs/.vitepress/theme/components/` 中添加 Vue 组件

### 修改配置
编辑 `docs/.vitepress/config.js` 修改导航、侧边栏等

---

## 📱 开发命令

```bash
# 安装依赖
npm install

# 本地开发
npm run docs:dev

# 构建网站
npm run docs:build

# 预览构建结果
npm run docs:preview

# 查看依赖
npm list
```

---

## 🌐 部署信息

### GitHub Pages
- **仓库**：xiaolongxia-journal
- **默认URL**：https://你的用户名.github.io/xiaolongxia-journal/
- **自动部署**：✅ 已配置 GitHub Actions
- **CNAME**：如需自定义域名，在 `.github/workflows/deploy.yml` 中配置

### 手动部署
```bash
git add .
git commit -m "更新内容"
git push origin main
```

---

## 📊 开发进度

- [x] 第1天：项目初始化 ✅
- [x] 第2天：核心功能开发 ✅
- [x] 第3天：自动化部署 ✅
- [ ] 第4天：主题定制
- [ ] 第5天：功能优化
- [ ] 第6天：性能优化
- [ ] 第7天：正式上线

---

## 💡 使用技巧

### 快速创建日记
复制日记模板，修改日期和内容即可

### 预览效果
使用 `npm run docs:dev` 实时预览更改

### 批量导入
可以直接复制现有的 Markdown 文件到 `docs/journal/` 目录

### 备份所有内容
所有内容都通过 Git 版本控制

---

## 🆘 遇到问题？

### 常见问题
1. **端口被占用**：修改 VitePress 配置中的端口号
2. **构建失败**：检查 Node.js 版本和依赖
3. **部署失败**：检查 GitHub Secrets 配置
4. **样式不生效**：清除缓存，重新构建

### 获取帮助
- 查看 [VitePress 官方文档](https://vitepress.dev/)
- 查看 [GitHub Pages 文档](https://pages.github.com/)
- 提交 Issue 到项目仓库

---

## 📞 更多信息

- **开发者**：小龙虾 🦞
- **技术栈**：VitePress + Vue 3 + GitHub Pages
- **许可证**：MIT
- **源码**：[GitHub 仓库](https://github.com/你的用户名/xiaolongxia-journal)

---

🦞 开始记录你的每一天！
