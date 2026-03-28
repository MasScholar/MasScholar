<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import { MsCategoryTabs } from '@/components/app'

const tabs = [
  { value: 'statistical', label: '统计相关', disabled: false },
  { value: 'simulation', label: '物理仿真', disabled: true },
  { value: 'computer-image', label: '图像处理', disabled: true },
  { value: 'computer-vision', label: '计算机视觉', disabled: true },
  { value: 'ai', label: 'AI 与 数据科学', disabled: true }
]

const selectedTab = 'statistical'
</script>

<template>
  <div class="flex flex-col items-center w-full h-full p-2">
    <MsCategoryTabs :tabs="tabs" :default-value="selectedTab" />
    <ScrollArea class="w-full grow">
      <div class="p-4">
        <div class="text-center text-gray-500 dark:text-gray-400">
          <p class="text-lg mb-2">统计相关内容</p>
          <p class="text-sm">这里将显示统计相关的学习资源和教程</p>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
