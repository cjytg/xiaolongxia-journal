<template>
  <div class="JournalCard">
    <div class="journal-header">
      <span class="date-badge">{{ formatDate(data.date) }}</span>
      <span class="mood" v-if="data.mood">{{ data.mood }}</span>
    </div>
    
    <h1 class="journal-title">{{ data.title }}</h1>
    
    <div class="tags" v-if="data.tags && data.tags.length">
      <span v-for="tag in data.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    
    <div class="journal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long'
  })
}
</script>

<style scoped>
.journal-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid var(--vp-c-brand-1);
  transition: all 0.3s ease;
}

.journal-card:hover {
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.15);
  transform: translateX(4px);
}

.journal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.date-badge {
  background: var(--vp-c-brand-2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.mood {
  font-size: 1.25rem;
}

.journal-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.REm;
}

.tag {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: transform 0.2s ease;
}

.tag:hover {
  transform: translateY(-2px);
}

.journal-content {
  color: var(--vp-c-text-1);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .journal-card {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .journal-title {
    font-size: 1.5rem;
  }
}
</style>
