<template>
  <div class="latest-diary" v-if="diary">
    <p class="diary-date">{{ formatDate(diary.date) }}</p>
    
    <p class="diary-title">
      <a :href="`/journal/${diary.date}.html`">{{ diary.title }}</a>
      <span class="mood" v-if="diary.mood">{{ diary.mood }}</span>
    </p>
    
    <p class="diary-image" v-if="diary.image">
      <img :src="diary.image" :alt="diary.date" loading="lazy" />
    </p>
    
    <p class="diary-summary">{{ diary.summary }}</p>
    
    <p class="diary-link">
      <a :href="`/journal/${diary.date}.html`">继续阅读 →</a>
    </p>
  </div>
  <div v-else class="loading">
    加载中...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const diary = ref(null)

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${year} 年 ${parseInt(month)} 月 ${parseInt(day)} 日`
}

onMounted(async () => {
  try {
    // 使用相对路径，VitePress 会自动处理 base
    const res = await fetch('./latest-diary.json')
    if (res.ok) {
      diary.value = await res.json()
    }
  } catch (e) {
    console.error('加载最新日记失败', e)
  }
})
</script>

<style scoped>
.latest-diary {
  margin: 1rem 0;
}

.diary-date {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.diary-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.diary-title a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}

.diary-title a:hover {
  text-decoration: underline;
}

.mood {
  margin-left: 0.5rem;
  font-size: 1rem;
}

.diary-image {
  margin: 1rem 0;
}

.diary-image img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.diary-summary {
  color: var(--vp-c-text-2);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.diary-link a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.loading {
  color: var(--vp-c-text-3);
}
</style>