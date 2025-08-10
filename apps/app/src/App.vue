<script setup lang="ts">
import { SidebarProvider } from '@masscholar/ui';
</script>
<template>
  <SidebarProvider>
    <div class="w-full h-screen overscroll-none overflow-hidden">
      <router-view />
    </div>
  </SidebarProvider>
</template>
<style>
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

html,
body {
  @apply overscroll-none overflow-hidden;
}
</style>
