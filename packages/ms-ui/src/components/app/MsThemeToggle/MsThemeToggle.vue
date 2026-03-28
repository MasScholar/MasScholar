<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { Switch } from '@/components/ui/switch'
import type { HTMLAttributes } from 'vue'

interface Props {
  modelValue?: boolean
  className?: HTMLAttributes['class']
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  className: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function handleToggle(value: boolean) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="flex items-center space-x-1" :class="className">
    <Sun class="text-white w-[14px] h-[14px]" />
    <Switch class="cursor-pointer" :model-value="modelValue" @update:model-value="handleToggle" />
    <Moon class="text-white w-[14px] h-[14px]" />
  </div>
</template>