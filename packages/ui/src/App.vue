<script setup lang="ts">
import { nvButton } from './components'
</script>

<template>
  <h1>nevo ui elements</h1>
  <h3>&lt;nv-button&gt;</h3>
  <div class="row">
    <nv-button>Test</nv-button>
    <nv-button hoverable>⬇</nv-button>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  gap: 10px;
}
</style>
