<script setup lang="ts">
import { Icon } from "@iconify/vue";

import placeholder from "../assets/placeholder.svg"
</script>
<template>
  <div class="flex flex-row w-full h-full">
    <div
      class="electron-app-region flex flex-row justify-center items-center w-2/3 bg-[linear-gradient(135deg,#ec4899,#f472b6,#c084fc,#8b5cf6,#60a5fa,#34d399,#fbbf24)] bg-[length:200%_200%] animate-gradient-diag">
      <div class="w-[400px] relative flex flex-col text-center bg-gray-800 p-14 rounded-xl">
        <h1 class="text-white text-5xl font-bold">MaS<br />Scholar</h1>
        <p class="text-gray-300 text-sm mt-2 mb-2">Modern AI-Powered Statistical Toolkit</p>
        <button class="bg-white text-black px-4 py-2 rounded-lg mt-4 text-left">
          <Icon icon="mdi:arrow-right" class="w-[20px] h-[20px] inline-block mr-2" />快速开始…
        </button>
        <button class="bg-white text-black px-4 py-2 rounded-lg mt-4 text-left">
          <Icon icon="ion:library-outline" class="w-[20px] h-[20px] inline-block mr-2" />学习与探索…
        </button>
        <button class="bg-white text-black px-4 py-2 rounded-lg mt-4 text-left">
          <Icon icon="f7:plus-app" class="w-[20px] h-[20px] inline-block mr-2" />新建项目…
        </button>
        <button class="bg-white text-black px-4 py-2 rounded-lg mt-4 text-left">
          <Icon icon="fluent:folder-24-regular" class="w-[20px] h-[20px] inline-block mr-2" />打开项目…
        </button>
        <!-- Settings -->
        <button class="text-white bottom-[10px] right-[1px] absolute">
          <Icon icon="uil:setting" class="w-[20px] h-[20px] inline-block mr-2" />
        </button>
      </div>
    </div>
    <div class="flex flex-col flex-grow h-screen p-2 space-y-1 bg-gray-700">
      <div class="flex flex-row justify-start items-center bg-blue-500 w-full h-[60px] rounded-lg text-white p-2">
        <div class="w-[50px] h-full mr-2">
          <img :src="placeholder" alt="Image" class="object-cover w-full h-full rounded-lg" />
        </div>
        <div>
          <h6 class="text-sm">心理学实验数据分析范例</h6>
          <span class="text-xs text-white">MasScholar</span>
        </div>
      </div>
      <div class="flex flex-row justify-start items-center w-full h-[60px] rounded-lg text-white p-2">
        <div class="w-[50px] h-full mr-2">
          <img :src="placeholder" alt="Image" class="object-cover w-full h-full rounded-lg" />
        </div>
        <div>
          <h6 class="text-sm">市场调研数据统计实践</h6>
          <span class="text-xs text-gray-500">MasScholar</span>
        </div>
      </div>
      <div class="flex flex-row justify-start items-center w-full h-[60px] rounded-lg text-white p-2">
        <div class="w-[50px] h-full mr-2">
          <img :src="placeholder" alt="Image" class="object-cover w-full h-full rounded-lg" />
        </div>
        <div>
          <h6 class="text-sm">农田水分管理数据描述统计与推断</h6>
          <span class="text-xs text-gray-500">MasScholar</span>
        </div>
      </div>
      <div class="flex flex-row justify-start items-center w-full h-[60px] rounded-lg text-white p-2">
        <div class="w-[50px] h-full mr-2">
          <img :src="placeholder" alt="Image" class="object-cover w-full h-full rounded-lg" />
        </div>
        <div>
          <h6 class="text-sm">智慧城市交通流量预测模型</h6>
          <span class="text-xs text-gray-500">MasScholar</span>
        </div>
      </div>
      <div class="flex flex-row justify-start items-center w-full h-[60px] rounded-lg text-white p-2">
        <div class="w-[50px] h-full mr-2">
          <img :src="placeholder" alt="Image" class="object-cover w-full h-full rounded-lg" />
        </div>
        <div>
          <h6 class="text-sm">农田环境统计分析及报告生成</h6>
          <span class="text-xs text-gray-500">MasScholar</span>
        </div>
      </div>
    </div>
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
