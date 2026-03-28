<script setup lang="ts">
import { Moon, Sun, BarChart, Brain, Droplet, Building2, Leaf } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'
import { ScrollArea, Switch, MsRecentItem } from '@masscholar/ui'
import router from '@/router'
import { useColorMode } from '@vueuse/core'

const theme_mode = useColorMode()

const recently_used_list = [
  {
    uid: '1',
    name: '市场调研数据统计实践',
    type: 'Project',
    icon: BarChart,
    iconColor: '#2563EB',
    bgColor: '#DBEAFE',
  },
  {
    uid: '2',
    name: '心理学实验数据分析范例',
    type: 'Tutorial',
    icon: Brain,
    iconColor: '#7C3AED',
    bgColor: '#EDE9FE',
  },
  {
    uid: '3',
    name: '农田水分管理数据描述统计与推断',
    type: 'Project',
    icon: Droplet,
    iconColor: '#0891B2',
    bgColor: '#CFFAFE',
  },
  {
    uid: '4',
    name: '智慧城市交通流量预测模型',
    type: 'Project',
    icon: Building2,
    iconColor: '#EA580C',
    bgColor: '#FFEDD5',
  },
  {
    uid: '5',
    name: '农田环境统计分析及报告生成',
    type: 'Project',
    icon: Leaf,
    iconColor: '#16A34A',
    bgColor: '#DCFCE7',
  },
]

async function handleClickSetings() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log('handleClickSetings', (window as any).NativeAPI)
  const user = await window.NATIVE_API.user.getUser('123')
  console.log('User:', user)

  window.NATIVE_API.chat.sendMessage({ user: 'Tom', text: 'Hello!' })
  // (window as any).electronAPI.send('open-settings-window')
}

function handleClickOpenProject() {
  router.push('/projects')
}

function handleClickLearnAndExplore() {
  router.push('/learn-explore')
}

function handleClickQuickStart() {
  router.push('/quick-start')
}

function handleClickCreateProject() {
  router.push('/create-project')
}
</script>
<template>
  <div class="flex flex-row w-full h-full dark:bg-gray-700">
    <div
      class="relative flex flex-row justify-center items-center w-2/3 bg-[linear-gradient(135deg,#ec4899,#f472b6,#c084fc,#8b5cf6,#60a5fa,#34d399,#fbbf24)] bg-[length:200%_200%] animate-gradient-diag">
      <div class="electron-app-region absolute w-full h-[35px] top-0"></div>
      <!-- toggle dart mode -->
      <div class="electron-app-region-none absolute space-x-1 mb-4 right-4 top-[10px]">
        <Sun class="text-white w-[14px] h-[14px] inline-block mt-[-8px]" />
        <Switch class="mt-[4px] cursor-pointer" :model-value="theme_mode === 'dark'" @update:model-value="
          (value) => {
            theme_mode = value ? 'dark' : 'light'
          }
        " />
        <Moon class="text-white w-[14px] h-[14px] inline-block mt-[-8px]" />
      </div>
      <!-- version -->
      <div class="absolute text-white dark:text-gray-400 text-sm bottom-2 left-2">v0.0.1</div>
      <div
        class="electron-app-region-none w-[400px] relative flex flex-col text-center bg-white dark:bg-gray-800 p-14 rounded-xl">
        <h1 class="text-black dark:text-white text-5xl font-bold">MaS<br />Scholar</h1>
        <p class="text-gray-600 dark:text-gray-300 text-sm mt-2 mb-2">
          Modern AI-Powered Statistical Toolkit
        </p>
        <button
          class="bg-gray-600 text-white dart:bg-white text-black px-4 py-2 rounded-lg mt-4 text-left cursor-pointer hover:bg-gray-500"
          @click="handleClickQuickStart">
          <Icon icon="mdi:arrow-right" class="w-[20px] h-[20px] inline-block mr-2" />快速开始…
        </button>
        <button
          class="bg-white border-solid border-1 text-black px-4 py-2 rounded-lg mt-4 text-left cursor-pointer hover:bg-gray-500 hover:text-white"
          @click="handleClickLearnAndExplore">
          <Icon icon="ion:library-outline" class="w-[20px] h-[20px] inline-block mr-2" />学习与探索…
        </button>
        <button
          class="bg-white border-solid border-1 text-black px-4 py-2 rounded-lg mt-4 text-left cursor-pointer hover:bg-gray-500 hover:text-white"
          @click="handleClickCreateProject">
          <Icon icon="f7:plus-app" class="w-[20px] h-[20px] inline-block mr-2" />新建项目…
        </button>
        <button
          class="bg-white border-solid border-1 text-black px-4 py-2 rounded-lg mt-4 text-left cursor-pointer hover:bg-gray-500 hover:text-white"
          @click="handleClickOpenProject">
          <Icon icon="fluent:folder-24-regular" class="w-[20px] h-[20px] inline-block mr-2" />打开项目…
        </button>
        <!-- Locale -->
        <button class="electron-app-region-none absolute bottom-0 left-[14px] text-[24px]">
          🇨🇳
        </button>
        <!-- Settings -->
        <button
          class="electron-app-region-none absolute text-gray-700 dark:text-white bottom-[10px] right-[1px] cursor-pointer"
          @click="handleClickSetings">
          <Icon icon="uil:setting" class="w-[20px] h-[20px] inline-block mr-2 hover:text-gray-500" />
        </button>
      </div>
    </div>
    <ScrollArea class="flex flex-col flex-grow h-screen p-2 bg-white dark:bg-gray-700 mt-10">
      <MsRecentItem v-for="recently_used in recently_used_list" :key="recently_used.uid" :name="recently_used.name"
        :type="recently_used.type" time="1 min before" :icon="recently_used.icon" :icon-color="recently_used.iconColor"
        :bg-color="recently_used.bgColor" />
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
