<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { HTMLAttributes } from 'vue'

interface Tab {
  value: string
  label: string
}

interface Props {
  tabs: Tab[]
  defaultValue?: string
  className?: HTMLAttributes['class']
}

withDefaults(defineProps<Props>(), {
  defaultValue: '',
  className: undefined
})

const emit = defineEmits<{
  'update:value': [value: string]
}>()

function handleValueChange(value: string) {
  emit('update:value', value)
}
</script>

<template>
  <Tabs :default-value="defaultValue" class="electron-app-region" @update:value="handleValueChange">
    <TabsList :class="className">
      <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>