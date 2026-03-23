<template>
  <div class="gallery-container">
    <!-- 轮播区域：最近4天 -->
    <div class="carousel-section" v-if="recentImages.length > 0">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="16"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :loop="true"
        class="gallery-swiper"
      >
        <SwiperSlide v-for="item in recentImages" :key="item.date">
          <a :href="withBase(`/journal/${item.date}.html`)" class="carousel-item">
            <img 
              :src="withBase(`/images/${item.date}.png`)" 
              :alt="item.title"
              loading="lazy"
            />
            <div class="carousel-info">
              <span class="carousel-date">{{ formatDate(item.date) }}</span>
              <span class="carousel-title">{{ item.title }}</span>
            </div>
          </a>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- 瀑布流区域：更早的图片 -->
    <div class="grid-section" v-if="olderImages.length > 0">
      <h3 class="grid-title">更多日记</h3>
      <div ref="grid" class="gallery-grid">
        <a
          v-for="item in olderImages"
          :key="item.date"
          :href="withBase(`/journal/${item.date}.html`)"
          class="gallery-item"
        >
          <img 
            :src="withBase(`/images/${item.date}.png`)" 
            :alt="item.title"
            loading="lazy"
          />
          <div class="gallery-overlay">
            <span class="gallery-date">{{ formatDate(item.date) }}</span>
            <span class="gallery-title">{{ item.title }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { withBase } from 'vitepress'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// 注册 Swiper 模块
const modules = [Autoplay, Pagination, Navigation]

// 所有日记图片列表（按日期倒序，最新的在前）
const allImages = [
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

// 最近4天的图片用于轮播
const recentImages = computed(() => allImages.slice(0, 4))

// 更早的图片用于瀑布流
const olderImages = computed(() => allImages.slice(4))

const grid = ref(null)

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${parseInt(month)}/${parseInt(day)}`
}
</script>

<style scoped>
.gallery-container {
  padding: 0;
}

/* 轮播区域 */
.carousel-section {
  margin-bottom: 2rem;
}

.gallery-swiper {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.carousel-item {
  display: block;
  position: relative;
  height: 320px;
  text-decoration: none;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.carousel-date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}

.carousel-title {
  font-size: 1.25rem;
  color: white;
  font-weight: 600;
}

/* Swiper 样式覆盖 */
:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: var(--vp-c-brand-1);
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: white;
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 50%;
}

:deep(.swiper-button-prev::after),
:deep(.swiper-button-next::after) {
  font-size: 1rem;
}

/* 瀑布流区域 */
.grid-section {
  margin-top: 2rem;
}

.grid-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.gallery-item {
  display: block;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
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
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.8);
}

.gallery-title {
  font-size: 0.85rem;
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
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .carousel-item {
    height: 240px;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .gallery-item {
    height: 160px;
  }
}

@media (max-width: 480px) {
  .carousel-item {
    height: 200px;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .gallery-item {
    height: 140px;
  }
}
</style>