# 🦞 主题组件使用指南

## 可用组件

### JournalCard
日记卡片组件，用于显示单篇日记

**使用方式**：
```vue
<JournalCard :data="日记数据">
  <template #default>
    <!-- 你的日记内容 -->
  </template>
</JournalCard>
```

**数据格式**：
```javascript
{
  title: '日记标题',
  date: '2026-03-11',
  tags: ['学习', '工作'],
  mood: '😊',
  category: '日常'
}
```

**功能特性**：
- ✅ 自动格式化日期（中文格式）
- ✅ 显示情络图标
- ✅ 标签样式优化
- ✅ 响应式设计
- ✅ 悬停动画效果

---

## 自定义样式

### 自定义CSS文件
在 `.vitepress/theme/styles/custom.css` 中添加你的自定义样式

**可用的CSS变量**：
- `--vp-c-brand-1` 到 `--vp-c-brand-4`：主题颜色
- `--vp-c-bg-soft`：柔和背景色
- `--vp-c-bg-alt`：替代背景色
- `--vp-c-divider`：分割线颜色

**示例**：
```css
.my-custom-class {
  background: var(--vp-c-brand-1);
  color: white;
}
```

---

## 主题定制提示

### 1. 颜色定制
修改 `custom.css` 中的CSS变量来改变主题颜色

### 2. 布局调整
在 `custom.css` 中添加自定义CSS来调整布局

### 3. 组件使用
在Markdown文件中使用Vue组件增强显示效果

### 4. 响应式优化
在 `custom.css` 中使用媒体查询优化移动端显示

---

## 主题资源

### 目录结构
```
docs/.vitepress/theme/
├── components/
│   └── JournalCard.vue    # 日记卡片组件
├── styles/
│   └── custom.css       # 自定义样式
└── index.js             # 主题入口（可选）
```

---

## 样式优先级

1. VitePress 默认样式
2. 自定义主题样式
3. 组件级样式
4. Markdown内联样式

自定义样式会覆盖默认样式。

---

🦞 享受主题定制！
