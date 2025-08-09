<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@masscholar/ui'
</script>
<template>
  <div class="p-2">
    <div class="flex flex-row justify-center">
      <Tabs default-value="account">
        <TabsList>
          <TabsTrigger value="account" class="w-[240px]">
            账户
          </TabsTrigger>
          <TabsTrigger value="general">
            常规
          </TabsTrigger>
          <TabsTrigger value="theme">
            主题
          </TabsTrigger>
          <TabsTrigger value="data">
            数据
          </TabsTrigger>
          <TabsTrigger value="document">
            文档
          </TabsTrigger>
          <TabsTrigger value="chart">
            图表
          </TabsTrigger>
          <TabsTrigger value="units">
            单位
          </TabsTrigger>
          <TabsTrigger value="terminal">
            控制台
          </TabsTrigger>
          <TabsTrigger value="ai">
            AI
          </TabsTrigger>
          <TabsTrigger value="lang_environment">
            语言环境
          </TabsTrigger>
          <TabsTrigger value="privacy">
            隐私
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  </div>
</template>
