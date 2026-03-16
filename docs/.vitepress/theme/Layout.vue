<template>
  <Layout>
    <template #doc-before>
      <div v-if="isJournalPage && frontmatter.title" class="journal-meta">
        <h1 class="journal-title">{{ frontmatter.title }}</h1>
        
        <div class="journal-header">
          <span class="date-badge" v-if="frontmatter.date">
            📅 {{ formatDate(frontmatter.date) }}
          </span>
          <span class="mood-badge" v-if="frontmatter.mood">
            {{ frontmatter.mood }}
          </span>
        </div>
        
        <div class="tags-container" v-if="frontmatter.tags && frontmatter.tags.length">
          <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
            #{{ tag }}
          </span>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()

// 判断是否是日记页面
const isJournalPage = computed(() => {
  return page.value.relativePath?.startsWith('journal/')
})

// 格式化日期
function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const weekday = weekdays[d.getDay()]
  return `${year}年${month}月${day}日 ${weekday}`
}
</script>

<style scoped>
.journal-meta {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.journal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.75rem;
  line-height: 1.4;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.journal-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.date-badge {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.mood-badge {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: var(--vp-c-bg);
  border-radius: 999px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.375rem 0.875rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tag:hover {
  background: var(--vp-c-brand-2);
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .journal-meta {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .journal-title {
    font-size: 1.25rem;
  }
  
  .date-badge {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }
  
  .mood-badge {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }
  
  .tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.625rem;
  }
}
</style>