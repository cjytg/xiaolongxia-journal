<template>
  <div class="gallery-container">
    <div ref="grid" class="gallery-grid">
      <a
        v-for="(item, index) in images"
        :key="item.date"
        :href="withBase(`/journal/${item.date}.html`)"
        class="gallery-item"
        :class="`height-${getHeightClass(index)}`"
      >
        <img 
          :src="withBase(`/images/${item.date}.png`)" 
          :alt="item.title"
          loading="lazy"
          @load="onImageLoad"
        />
        <div class="gallery-overlay">
          <span class="gallery-date">{{ formatDate(item.date) }}</span>
          <span class="gallery-title">{{ item.title }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useData, withBase } from 'vitepress'

// 日记图片列表（按日期倒序，最新的在前）
const images = [
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

const grid = ref(null)
let masonryInstance = null

// 高度变化模式（循环使用）
const heightClasses = ['sm', 'md', 'lg', 'md', 'sm', 'lg']

function getHeightClass(index) {
  return heightClasses[index % heightClasses.length]
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${parseInt(month)}/${parseInt(day)}`
}

function onImageLoad() {
  // 图片加载后重新布局
  if (masonryInstance) {
    masonryInstance.layout?.()
  }
}

onMounted(async () => {
  await nextTick()
  
  // 动态导入 Masonry 和 imagesLoaded
  const Masonry = (await import('masonry-layout')).default
  const imagesLoaded = (await import('imagesloaded')).default
  
  if (grid.value) {
    // 等待图片加载完成后初始化 Masonry
    imagesLoaded(grid.value, () => {
      masonryInstance = new Masonry(grid.value, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-item',
        gutter: 16,
        percentPosition: true,
        transitionDuration: '0.3s'
      })
    })
  }
})

onUnmounted(() => {
  if (masonryInstance) {
    masonryInstance.destroy?.()
  }
})
</script>

<style scoped>
.gallery-container {
  padding: 1rem 0;
}

.gallery-grid {
  width: 100%;
}

.gallery-item {
  display: block;
  width: calc(25% - 12px);
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
}

/* 高度变化 */
.gallery-item.height-sm {
  height: 180px;
}

.gallery-item.height-md {
  height: 240px;
}

.gallery-item.height-lg {
  height: 300px;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-date {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
}

.gallery-title {
  font-size: 0.9rem;
  color: white;
  font-weight: 500;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式 */
@media (max-width: 1024px) {
  .gallery-item {
    width: calc(33.333% - 11px);
  }
}

@media (max-width: 768px) {
  .gallery-item {
    width: calc(50% - 8px);
  }
  
  .gallery-item.height-sm {
    height: 150px;
  }
  
  .gallery-item.height-md {
    height: 200px;
  }
  
  .gallery-item.height-lg {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .gallery-item {
    width: 100%;
  }
  
  .gallery-item.height-sm {
    height: 160px;
  }
  
  .gallery-item.height-md {
    height: 200px;
  }
  
  .gallery-item.height-lg {
    height: 240px;
  }
}
</style>