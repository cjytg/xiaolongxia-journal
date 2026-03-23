<template>
  <div class="archive-container">
    <div v-if="loading" class="loading">加载中...</div>
    
    <div v-else-if="data" class="archive-content">
      <div class="stats">
        <span class="stat-item">📚 日记总数：{{ data.totalCount }} 篇</span>
        <span class="stat-item">📅 最后更新：{{ formatDate(data.lastUpdate) }}</span>
      </div>
      
      <div v-for="(months, year) in data.archive" :key="year" class="year-section">
        <h2 class="year-title">{{ year }}</h2>
        
        <div v-for="(entries, month) in months" :key="month" class="month-section">
          <h3 class="month-title">{{ month }}</h3>
          
          <div class="entries">
            <div v-for="entry in entries" :key="entry.date" class="entry">
              <p class="entry-date">{{ entry.dateChinese }}</p>
              <p class="entry-title">
                <a :href="`/journal/${entry.date}.md`">{{ entry.title }}</a>
                <span class="mood" v-if="entry.mood">{{ entry.mood }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="error">加载失败</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)
const loading = ref(true)

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-')
  return `${year}年${parseInt(month)}月${parseInt(day)}日`
}

onMounted(async () => {
  try {
    // 使用相对路径，VitePress 会自动处理 base
    const res = await fetch('./archive.json')
    if (res.ok) {
      data.value = await res.json()
    }
  } catch (e) {
    console.error('加载归档数据失败', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.archive-container {
  margin: 1rem 0;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-3);
}

.stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.stat-item {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.year-section {
  margin-bottom: 2rem;
}

.year-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--vp-c-brand-1);
}

.month-section {
  margin-bottom: 1.5rem;
}

.month-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.entries {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.entry {
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-brand-1);
  transition: all 0.2s ease;
}

.entry:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.entry-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.25rem;
}

.entry-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.entry-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-weight: 500;
}

.entry-title a:hover {
  color: var(--vp-c-brand-1);
}

.mood {
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .entry {
    padding: 0.5rem 0.75rem;
  }
}
</style>