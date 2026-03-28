<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  version: string
  className?: HTMLAttributes['class']
}

withDefaults(defineProps<Props>(), {
  className: undefined
})
</script>

<template>
  <div class="text-white dark:text-gray-400 text-sm" :class="className">
    v{{ version }}
  </div>
</template>