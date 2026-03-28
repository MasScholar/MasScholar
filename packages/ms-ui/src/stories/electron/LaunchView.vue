<script setup lang="ts">
import { ArrowRight, BookOpen, Plus, Folder, Settings } from 'lucide-vue-next'
import { ScrollArea } from '@masscholar/ui'
import { MsButton, MsThemeToggle, MsRecentItem, MsLanguageToggle, MsVersionInfo } from '@masscholar/ui'
import placeholder from './placeholder.svg'
import { useColorMode } from '@vueuse/core'

const theme_mode = useColorMode()

const recently_used_list = [
  {
    uid: '1',
    name: '市场调研数据统计实践',
    type: 'Project',
  },
  {
    uid: '2',
    name: '心理学实验数据分析范例',
    type: 'Tutorial',
  },
  {
    uid: '3',
    name: '农田水分管理数据描述统计与推断',
    type: 'Project',
  },
  {
    uid: '4',
    name: '智慧城市交通流量预测模型',
    type: 'Project',
  },
  {
    uid: '5',
    name: '农田环境统计分析及报告生成',
    type: 'Project',
  },
]

function handleClickQuickStart() {
  console.log('Quick Start')
}

function handleClickLearnAndExplore() {
  console.log('Learn and Explore')
}

function handleClickCreateProject() {
  console.log('Create Project')
}

function handleClickOpenProject() {
  console.log('Open Project')
}

function handleClickSettings() {
  console.log('Settings')
}
</script>

<template>
  <div class="flex flex-row w-full h-full dark:bg-gray-700">
    <div
      class="relative flex flex-row justify-center items-center w-2/3 bg-[linear-gradient(135deg,#ec4899,#f472b6,#c084fc,#8b5cf6,#60a5fa,#34d399,#fbbf24)] bg-[length:200%_200%] animate-gradient-diag">
      <div class="electron-app-region absolute w-full h-[35px] top-0"></div>
      <div class="electron-app-region-none absolute space-x-1 mb-4 right-4 top-[10px]">
        <MsThemeToggle :model-value="theme_mode === 'dark'"
          @update:model-value="(value) => { theme_mode = value ? 'dark' : 'light' }" />
      </div>
      <MsVersionInfo version="0.0.1" class="absolute bottom-2 left-2" />
      <div
        class="electron-app-region-none w-[400px] relative flex flex-col text-center bg-white dark:bg-gray-800 p-14 rounded-xl">
        <h1 class="text-black dark:text-white text-5xl font-bold">MaS<br />Scholar</h1>
        <p class="text-gray-600 dark:text-gray-300 text-sm mt-2 mb-2">
          Modern AI-Powered Statistical Toolkit
        </p>
        <MsButton variant="primary" mode="icon-text" class="w-full justify-start mt-4" @click="handleClickQuickStart">
          <template #icon>
            <ArrowRight class="w-[20px] h-[20px] mr-2" />
          </template>
          快速开始…
        </MsButton>
        <MsButton variant="outline" mode="icon-text" class="w-full justify-start mt-4"
          @click="handleClickLearnAndExplore">
          <template #icon>
            <BookOpen class="w-[20px] h-[20px] mr-2" />
          </template>
          学习与探索…
        </MsButton>
        <MsButton variant="outline" mode="icon-text" class="w-full justify-start mt-4"
          @click="handleClickCreateProject">
          <template #icon>
            <Plus class="w-[20px] h-[20px] mr-2" />
          </template>
          新建项目…
        </MsButton>
        <MsButton variant="outline" mode="icon-text" class="w-full justify-start mt-4" @click="handleClickOpenProject">
          <template #icon>
            <Folder class="w-[20px] h-[20px] mr-2" />
          </template>
          打开项目…
        </MsButton>
        <MsLanguageToggle class="electron-app-region-none absolute bottom-0 left-[14px]" />
        <MsButton variant="ghost" mode="icon" class="electron-app-region-none absolute bottom-[10px] right-[1px]"
          @click="handleClickSettings">
          <template #icon>
            <Settings class="w-[20px] h-[20px]" />
          </template>
        </MsButton>
      </div>
    </div>
    <ScrollArea class="flex flex-col flex-grow h-screen p-2 bg-white dark:bg-gray-700 mt-10">
      <MsRecentItem v-for="recently_used in recently_used_list" :key="recently_used.uid" :name="recently_used.name"
        :type="recently_used.type" time="1 min before" :image="placeholder" />
    </ScrollArea>
  </div>
</template>

<style scoped>
@keyframes gradient-diag {
  0% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 100% 100%;
  }

  100% {
    background-position: 0% 0%;
  }
}

.animate-gradient-diag {
  animation: gradient-diag 10s ease infinite;
}
</style>
