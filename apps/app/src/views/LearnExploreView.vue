<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@masscholar/ui'
import { ScrollArea } from '@masscholar/ui';

</script>
<template>
  <div class="flex flex-col items-center w-full h-full p-2">
    <Tabs default-value="statistical" class="mb-2">
      <TabsList>
        <TabsTrigger value="statistical" class="w-[240px]">
          统计相关
        </TabsTrigger>
        <TabsTrigger value="simulation" :disabled="true">
          物理仿真
        </TabsTrigger>
        <TabsTrigger value="computer-image" :disabled="true">
          图像处理
        </TabsTrigger>
        <TabsTrigger value="computer-vision" :disabled="true">
          计算机视觉
        </TabsTrigger>
        <TabsTrigger value="ai" :disabled="true">
          AI 与 数据科学
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <ScrollArea class="w-full flex-grow">
      <router-view></router-view>
    </ScrollArea>
  </div>
</template>
