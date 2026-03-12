# Vercel 部署指南

## 项目信息

- **项目名称**: 小龙虾的日记网站
- **框架**: VitePress 1.0
- **构建命令**: `npm run docs:build`
- **输出目录**: `docs/.vitepress/dist`

## 已完成的配置

✅ `vercel.json` 已创建，包含：
- 构建命令配置
- 输出目录配置
- 安装命令配置

## 部署步骤

### 方法一：通过 Vercel CLI（推荐）

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```
（会打开浏览器登录）

3. **部署项目**
```bash
cd C:\Users\Administrator\.openclaw\workspace\projects\daily-journal-website
vercel
```

4. **确认配置**
   - Project name: 按 Enter 使用默认或自定义
   - Link to existing project: No (如果是新项目)
   - Override settings: Yes (使用 vercel.json 中的配置）

5. **生产环境部署**
```bash
vercel --prod
```

### 方法二：通过 Vercel 网站连接 GitHub

1. **推送代码到 GitHub**
   - 确保项目已推送到 GitHub 仓库
   - 仓库应该包含所有文件（包括 vercel.json）

2. **连接 Vercel**
   - 访问 https://vercel.com/new
   - 点击 "Import Git Repository"
   - 选择你的 GitHub 仓库

3. **配置项目**
   - Framework Preset: VitePress（如果没有选择 Other）
   - Build Command: `npm run docs:build`
   - Output Directory: `docs/.vitepress/dist`
   - Install Command: `npm install`

4. **点击 Deploy**

5. **配置域名（可选）**
   - 项目部署后，在 Settings → Domains 添加自定义域名

## 部署后的地址

- 预览地址: `https://your-project.vercel.app`
- 生产地址: `https://your-project-name.vercel.app`

## 环境变量（如果需要）

如果项目需要环境变量，在 Vercel Dashboard 的 Settings → Environment Variables 中添加。

## 本地预览构建结果

在部署前，可以先在本地预览构建结果：

```bash
npm run docs:build
npm run docs:preview
```

访问 http://localhost:4173 查看构建后的网站。

## 故障排查

### 构建失败
- 检查 `package.json` 中的依赖是否完整
- 运行 `npm install` 确保依赖已安装
- 查看构建日志中的错误信息

### 404 错误
- 检查输出目录是否正确（`docs/.vitepress/dist`）
- 确认 vercel.json 中的配置是否正确

### 路由问题
- VitePress 默认使用 SPA 路由，Vercel 会自动处理
- 确保所有链接使用相对路径或以 `/` 开头

## 后续更新

每次更新代码后，推送并重新部署：

```bash
git add .
git commit -m "your commit message"
git push

# 如果使用 Vercel CLI
vercel --prod
```

或者如果连接了 GitHub，Vercel 会在每次 push 时自动部署。

## 常用命令

```bash
# 本地开发
npm run docs:dev

# 本地构建
npm run docs:build

# 本地预览构建结果
npm run docs:preview

# Vercel 部署到预览环境
vercel

# Vercel 部署到生产环境
vercel --prod

# 查看部署列表
vercel ls
```
