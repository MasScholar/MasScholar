<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  langCode?: string
  className?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  langCode: 'zh-CN',
  className: undefined
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  'update:langCode': [langCode: string]
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}

// 语言代码到国旗的映射
const langToFlag: Record<string, string> = {
  'zh-CN': '🇨🇳',
  'en-US': '🇺🇸',
  'ja-JP': '🇯🇵',
  'fr-FR': '🇫🇷',
  'de-DE': '🇩🇪',
  'pt-BR': '🇧🇷'
}

const flag = langToFlag[props.langCode] || '🌐'
</script>

<template>
  <button
    class="electron-app-region-none text-[24px] cursor-pointer"
    :class="className"
    @click="handleClick"
  >
    {{ flag }}
  </button>
</template>