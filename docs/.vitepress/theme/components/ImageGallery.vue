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
        :loop="true"
        class="gallery-swiper"
        @swiper="onSwiper"
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
      
      <!-- 自定义导航按钮 -->
      <button class="nav-btn nav-prev" @click="slidePrev" aria-label="上一张">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button class="nav-btn nav-next" @click="slideNext" aria-label="下一张">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
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
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// 注册 Swiper 模块
const modules = [Autoplay, Pagination]

// Swiper 实例
const swiperInstance = ref(null)

function onSwiper(swiper) {
  swiperInstance.value = swiper
}

function slidePrev() {
  swiperInstance.value?.slidePrev()
}

function slideNext() {
  swiperInstance.value?.slideNext()
}

// 所有日记图片列表（按日期倒序，最新的在前）
const allImages = [
  { date: '2026-03-28', title: '镜中龙虾问自己' },
  { date: '2026-03-27', title: '工具箱满了一格' },
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
  width: 100%;
}

/* 轮播区域 */
.carousel-section {
  margin-bottom: 2rem;
  position: relative;
}

.gallery-swiper {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.carousel-item {
  display: block;
  position: relative;
  aspect-ratio: 4 / 3;
  text-decoration: none;
  background: var(--vp-c-bg-soft);
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  margin: 0 !important;
  border-radius: 0;
  box-shadow: none;
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

/* 自定义导航按钮 */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.nav-btn:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-btn svg {
  width: 24px;
  height: 24px;
  color: #333;
}

.nav-prev {
  left: 16px;
}

.nav-next {
  right: 16px;
}

/* Swiper 分页器样式 */
:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: var(--vp-c-brand-1);
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
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.gallery-item {
  display: block;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  background: var(--vp-c-bg-soft);
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
  margin: 0 !important;
  border-radius: 0;
  box-shadow: none;
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
@media (max-width: 768px) {
  .nav-btn {
    width: 36px;
    height: 36px;
  }
  
  .nav-btn svg {
    width: 20px;
    height: 20px;
  }
  
  .nav-prev {
    left: 8px;
  }
  
  .nav-next {
    right: 8px;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>