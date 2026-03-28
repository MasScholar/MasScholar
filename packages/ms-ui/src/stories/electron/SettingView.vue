<script setup lang="ts">
import { MsSettingsTabs } from '@/components/app'

const tabs = [
  { value: 'account', label: '账户' },
  { value: 'general', label: '常规' },
  { value: 'theme', label: '主题' },
  { value: 'data', label: '数据' },
  { value: 'document', label: '文档' },
  { value: 'chart', label: '图表' },
  { value: 'units', label: '单位' },
  { value: 'terminal', label: '控制台' },
  { value: 'ai', label: 'AI' },
  { value: 'lang_environment', label: '语言环境' },
  { value: 'privacy', label: '隐私' }
]

const selectedTab = 'account'
</script>

<template>
  <div class="p-2">
    <div class="flex flex-row justify-center">
      <MsSettingsTabs :tabs="tabs" :default-value="selectedTab" />
    </div>
    <div class="mt-4 p-4">
      <div class="text-center text-gray-500 dark:text-gray-400">
        <p class="text-lg mb-2">账户设置</p>
        <p class="text-sm">这里将显示账户相关的设置选项</p>
      </div>
    </div>
  </div>
</template>
