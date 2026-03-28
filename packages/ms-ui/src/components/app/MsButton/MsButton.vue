<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Button } from "@/components/ui/button";
import type { ButtonVariants } from "@/components/ui/button";

interface Props {
  variant?: "default" | "primary" | "danger" | "outline" | "secondary" | "ghost" | "ghost-primary" | "ghost-danger" | "link";
  size?: "mini" | "small" | "default" | "large";
  mode?: "text" | "icon" | "icon-text";
  className?: HTMLAttributes["class"];
  disabled?: boolean;
  loading?: boolean;
  icon?: string; // 图标名称或 SVG 内容
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  mode: "text",
  className: undefined,
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return;
  emit("click", event);
}

// 映射 MsButton 变体到 ui/Button 变体
const getButtonVariant = (variant: string): ButtonVariants["variant"] => {
  const variantMap: Record<string, ButtonVariants["variant"]> = {
    default: "default",
    primary: "default",
    danger: "destructive",
    outline: "outline",
    secondary: "secondary",
    ghost: "ghost",
    "ghost-primary": "ghost",
    "ghost-danger": "ghost",
    link: "link",
  };
  return variantMap[variant] || "default";
};

// 映射 MsButton 尺寸到 ui/Button 尺寸
const getButtonSize = (size: string): ButtonVariants["size"] => {
  const sizeMap: Record<string, ButtonVariants["size"]> = {
    mini: "sm",
    small: "sm",
    default: "default",
    large: "lg",
  };
  return sizeMap[size] || "default";
};

// 映射图标模式到 ui/Button 尺寸
const getIconSize = (size: string): ButtonVariants["size"] => {
  const sizeMap: Record<string, ButtonVariants["size"]> = {
    mini: "icon-sm",
    small: "icon-sm",
    default: "icon",
    large: "icon-lg",
  };
  return sizeMap[size] || "icon";
};
</script>

<template>
  <Button :variant="getButtonVariant(variant)" :size="mode === 'icon' ? getIconSize(size) : getButtonSize(size)"
    :disabled="disabled || loading" :class="[
      className,
      'group',
      // 为 mini 尺寸添加更小的样式
      { 'h-7 text-xs px-2 has-[>svg]:px-2': size === 'mini' && mode !== 'icon' },
      // 为 mini 图标按钮添加固定大小
      { 'size-7': size === 'mini' && mode === 'icon' },
      // 为 primary 变体添加特定样式
      { 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md': variant === 'primary' },
      // 为 outline 变体添加特定样式
      { 'hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:border-gray-600': variant === 'outline' },
      // 为 ghost-primary 和 ghost-danger 添加特定样式
      { 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950': variant === 'ghost-primary' },
      { 'text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950': variant === 'ghost-danger' }
    ]" @click="handleClick">
    <!-- Loading spinner -->
    <template v-if="loading">
      <svg class="animate-spin" :class="{
        'w-3 h-3': size === 'mini',
        'w-4 h-4': size === 'small',
        'w-5 h-5': size === 'default',
        'w-6 h-6': size === 'large',
      }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </template>

    <!-- Icon slot for icon-only or icon-text mode -->
    <template v-else-if="(mode === 'icon' || mode === 'icon-text') && !loading">
      <slot name="icon">
        <!-- 支持传入 SVG 字符串 -->
        <template v-if="typeof icon === 'string' && icon.startsWith('<svg')">
          <span v-html="icon" :class="{
            'size-3': size === 'mini',
            'size-4': size === 'small',
            'size-5': size === 'default',
            'size-6': size === 'large',
            'transition-transform duration-200 group-hover:scale-110 group-hover:-translate-x-0.5': mode === 'icon-text',
            'transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6': mode === 'icon'
          }" class="group-hover:inline-block"></span>
        </template>
        <!-- 支持图标名称（预留） -->
        <svg v-else-if="icon" :class="{
          'size-3': size === 'mini',
          'size-4': size === 'small',
          'size-5': size === 'default',
          'size-6': size === 'large',
          'transition-transform duration-200 group-hover:scale-110 group-hover:-translate-x-0.5': mode === 'icon-text',
          'transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6': mode === 'icon'
        }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </slot>
    </template>

    <!-- Text content -->
    <span v-if="(mode === 'text' || mode === 'icon-text') && !loading" class="transition-colors duration-200">
      <slot />
    </span>
  </Button>
</template>
