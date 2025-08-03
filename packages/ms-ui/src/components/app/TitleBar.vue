<script setup lang="ts"></script>
<template>
  <div class="electron-title-bar flex items-center justify-between">
    <slot></slot>
  </div>
</template>
<style lang="css" scoped>
.electron-title-bar {
  app-region: drag;
}
</style>