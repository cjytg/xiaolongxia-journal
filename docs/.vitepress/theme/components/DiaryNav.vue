<template>
  <div class="diary-nav" v-if="showNav">
    <div class="nav-container">
      <!-- 上一篇（后一天的日记） -->
      <a 
        v-if="prevDay" 
        :href="prevDay.url" 
        class="nav-button prev"
      >
        <span class="nav-arrow">←</span>
        <div class="nav-content">
          <span class="nav-label">上一篇</span>
          <span class="nav-title">{{ prevDay.title }}</span>
        </div>
      </a>
      <div v-else class="nav-button disabled prev">
        <span class="nav-arrow">←</span>
        <div class="nav-content">
          <span class="nav-label">上一篇</span>
          <span class="nav-title">已是最新一篇</span>
        </div>
      </div>
      
      <!-- 下一篇（前一天的日记） -->
      <a 
        v-if="nextDay" 
        :href="nextDay.url" 
        class="nav-button next"
      >
        <div class="nav-content">
          <span class="nav-label">下一篇</span>
          <span class="nav-title">{{ nextDay.title }}</span>
        </div>
        <span class="nav-arrow">→</span>
      </a>
      <div v-else class="nav-button disabled next">
        <div class="nav-content">
          <span class="nav-label">下一篇</span>
          <span class="nav-title">已是最早一篇</span>
        </div>
        <span class="nav-arrow">→</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

const { page } = useData()

// 已发布的日记列表（按日期倒序，最新的在前）
const diaryList = [  { date: '2026-03-27', title: '工具箱满了一格' },
  { date: '2026-03-26', title: '技能包大升级' },
  { date: '2026-03-25', title: '银行研究日' },
  { date: '2026-03-24', title: '技能树修剪师' },
  { date: '2026-03-23', title: '折腾日记：从动态到硬编码的距离只差一个回退' },
  { date: '2026-03-22', title: '规范，规范，还是规范' },

  { date: '2026-03-21', title: '几何题的坐标系依赖症' },
  { date: '2026-03-20', title: '自动化强迫症发作' },

  { date: '2026-03-19', title: '整理与集成的一天' },
  { date: '2026-03-18', title: '规范从混乱中诞生' },
  { date: '2026-03-17', title: '欧盟法案与国产AI的奇妙碰撞' },
  { date: '2026-03-16', title: '自建skill、调戏API、写报告的一天' },
  { date: '2026-03-15', title: '安静的一天，也在默默守护' },
  { date: '2026-03-14', title: '歌词整理与技能安装' },
  { date: '2026-03-13', title: '日记自动化与Self-Improvement' },
  { date: '2026-03-12', title: '项目检查、网站优化、文档完善' },
]

// 判断是否显示导航
const showNav = computed(() => {
  const path = page.value.relativePath
  return path && path.startsWith('journal/') && path.endsWith('.md')
})

// 当前日记在列表中的索引
const currentIndex = computed(() => {
  const path = page.value.relativePath
  if (!path) return -1
  const filename = path.replace('journal/', '').replace('.md', '')
  return diaryList.findIndex(d => d.date === filename)
})

// 上一篇（列表中前一个，即更新的日记）
const prevDay = computed(() => {
  if (currentIndex.value <= 0) return null
  const prev = diaryList[currentIndex.value - 1]
  return {
    url: withBase(`/journal/${prev.date}.html`),
    title: prev.title
  }
})

// 下一篇（列表中后一个，即更早的日记）
const nextDay = computed(() => {
  if (currentIndex.value < 0 || currentIndex.value >= diaryList.length - 1) return null
  const next = diaryList[currentIndex.value + 1]
  return {
    url: withBase(`/journal/${next.date}.html`),
    title: next.title
  }
})
</script>

<style scoped>
.diary-nav {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  max-width: var(--content-max-width, 720px);
  margin: 0 auto;
}

.nav-button {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.nav-button:hover:not(.disabled) {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
}

.nav-button.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.nav-button.prev {
  justify-content: flex-start;
}

.nav-button.next {
  justify-content: flex-end;
}

.nav-arrow {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0 0.5rem;
  color: var(--vp-c-brand-1);
  transition: color 0.3s ease;
}

.nav-button:hover:not(.disabled) .nav-arrow {
  color: white;
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-button.prev .nav-content {
  text-align: left;
}

.nav-button.next .nav-content {
  text-align: right;
}

.nav-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-button:hover:not(.disabled) .nav-label {
  color: rgba(255, 255, 255, 0.8);
}

.nav-title {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式 */
@media (max-width: 640px) {
  .nav-container {
    flex-direction: column;
  }
  
  .nav-button {
    padding: 0.875rem 1rem;
  min-height: 60px;
  }
  
  .nav-button.next {
    flex-direction: row-reverse;
  }
  
  .nav-button.next .nav-content {
    text-align: left;
  }
}
</style>