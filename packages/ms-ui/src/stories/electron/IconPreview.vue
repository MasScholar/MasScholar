<script setup lang="ts">
import { BarChart, Brain, Droplet, Building2, Leaf } from 'lucide-vue-next'

const projectIcons = [
  {
    uid: '1',
    name: '市场调研数据统计实践',
    type: 'Project',
    icon: BarChart,
    icon_name: 'BarChart',
    description: '柱状图 - 代表数据统计和市场分析'
  },
  {
    uid: '2',
    name: '心理学实验数据分析范例',
    type: 'Tutorial',
    icon: Brain,
    icon_name: 'Brain',
    description: '大脑 - 代表心理学和思维分析'
  },
  {
    uid: '3',
    name: '农田水分管理数据描述统计与推断',
    type: 'Project',
    icon: Droplet,
    icon_name: 'Droplet',
    description: '水滴 - 代表水分管理'
  },
  {
    uid: '4',
    name: '智慧城市交通流量预测模型',
    type: 'Project',
    icon: Building2,
    icon_name: 'Building2',
    description: '建筑 - 代表城市和交通'
  },
  {
    uid: '5',
    name: '农田环境统计分析及报告生成',
    type: 'Project',
    icon: Leaf,
    icon_name: 'Leaf',
    description: '叶子 - 代表农业和环境'
  }
]
</script>

<template>
  <div class="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-center">最近项目图标预览</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projectIcons" :key="project.uid"
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <component :is="project.icon" class="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 class="font-semibold text-lg text-gray-800 dark:text-gray-200">{{ project.name }}</h3>
            <span class="text-sm text-gray-500 dark:text-gray-400">{{ project.type }}</span>
          </div>
        </div>

        <div class="mb-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <strong>图标名称:</strong> {{ project.icon_name }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            <strong>说明:</strong> {{ project.description }}
          </p>
        </div>

        <div class="border-t pt-4 mt-4">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">实际效果预览 (50x50px):</p>
          <div class="flex items-center space-x-2">
            <div class="w-[50px] h-[50px] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <component :is="project.icon" class="w-8 h-8 text-gray-700 dark:text-gray-300" />
            </div>
            <div class="w-[50px] h-[50px] bg-blue-500 rounded-lg flex items-center justify-center">
              <component :is="project.icon" class="w-8 h-8 text-white" />
            </div>
            <div class="w-[50px] h-[50px] bg-green-500 rounded-lg flex items-center justify-center">
              <component :is="project.icon" class="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="text-gray-600 dark:text-gray-400">
        如果这些图标合适，我可以帮你替换到 LaunchView 中的最近项目栏
      </p>
    </div>
  </div>
</template>
