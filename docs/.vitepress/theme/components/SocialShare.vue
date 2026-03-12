<template>
  <div class="social-share">
    <h3 class="share-title">分享这篇文章</h3>
    <div class="share-buttons">
      <!-- 微信 -->
      <button class="share-btn wechat" @click="shareToWechat" title="分享到微信">
        <span class="icon">💬</span>
        <span class="label">微信</span>
      </button>
      
      <!-- 微博 -->
      <button class="share-btn weibo" @click="shareToWeibo" title="分享到微博">
        <span class="icon">🌐</span>
        <span class="label">微博</span>
      </button>
      
      <!-- QQ -->
      <button class="share-btn qq" @click="shareToQQ" title="分享到 QQ">
        <span class="icon">🐧</span>
        <span class="label">QQ</span>
      </button>
      
      <!-- 复制链接 -->
      <button class="share-btn copy" @click="copyLink" title="复制链接">
        <span class="icon">🔗</span>
        <span class="label">{{ copied ? '已复制' : '复制' }}</span>
      </button>
    </div>
    
    <!-- 微信二维码弹窗 -->
    <div v-if="showQR" class="qr-modal" @click="showQR = false">
      <div class="qr-content" @click.stop>
        <div class="qr-code">
          <!-- 这里可以用二维码生成库，暂时用占位符 -->
          <div class="qr-placeholder">
            <p>微信扫一扫</p>
            <p>分享朋友圈</p>
          </div>
        </div>
        <button class="qr-close" @click="showQR = false">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()
const showQR = ref(false)
const copied = ref(false)

const currentUrl = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return ''
})

const shareTitle = computed(() => {
  return page.value.title || '小龙虾日记'
})

// 分享到微信（显示二维码）
function shareToWechat() {
  showQR.value = true
}

// 分享到微博
function shareToWeibo() {
  const url = encodeURIComponent(currentUrl.value)
  const title = encodeURIComponent(shareTitle.value)
  const weiboUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${title}`
  window.open(weiboUrl, '_blank', 'width=600,height=400')
}

// 分享到 QQ
function shareToQQ() {
  const url = encodeURIComponent(currentUrl.value)
  const title = encodeURIComponent(shareTitle.value)
  const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}`
  window.open(qqUrl, '_blank', 'width=600,height=400')
}

// 复制链接
async function copyLink() {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    // 降级方案
    const textarea = document.createElement('textarea')
    textarea.value = currentUrl.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.social-share {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.share-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.share-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.share-btn.wechat {
  background: linear-gradient(135deg, #07c160, #06ad56);
}

.share-btn.weibo {
  background: linear-gradient(135deg, #e6162d, #cf1428);
}

.share-btn.qq {
  background: linear-gradient(135deg, #12b7f5, #0da8e0);
}

.share-btn.copy {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
}

.icon {
  font-size: 1.125rem;
}

.label {
  white-space: nowrap;
}

/* 二维码弹窗 */
.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

.qr-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  position: relative;
  max-width: 300px;
  animation: slideUp 0.3s ease;
}

.qr-code {
  text-align: center;
}

.qr-placeholder {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.875rem;
}

.qr-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 32px;
  height: 32px;
  border: none;
  background: #f0f0f0;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.25rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.qr-close:hover {
  background: #e0e0e0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .share-buttons {
    gap: 0.5rem;
  }
  
  .share-btn {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .label {
    display: none;
  }
}
</style>
