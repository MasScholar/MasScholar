<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  name: string
  type: string
  time: string
  image?: string
  className?: HTMLAttributes['class']
}

withDefaults(defineProps<Props>(), {
  image: '',
  className: undefined
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <div
    class="group flex flex-row justify-start items-center w-full h-[60px] rounded-lg text-white p-2 hover:bg-blue-500 cursor-pointer"
    :class="className"
    @click="handleClick"
  >
    <div class="w-[50px] h-full mr-2">
      <img v-if="image" :src="image" alt="Image" class="object-cover w-full h-full rounded-lg" />
      <div v-else class="w-full h-full rounded-lg bg-gray-300 dark:bg-gray-600"></div>
    </div>
    <div class="flex-grow">
      <h6 class="text-sm text-black dark:text-white group-hover:text-white">{{ name }}</h6>
      <div class="flex flex-row items-center justify-between mt-2">
        <span class="text-xs text-gray-400 group-hover:text-white">{{ type }}</span>
        <span class="text-xs text-gray-400 group-hover:text-white">{{ time }}</span>
      </div>
    </div>
  </div>
</template>