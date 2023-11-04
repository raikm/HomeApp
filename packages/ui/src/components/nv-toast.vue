<template>
  <div class="nv-toast" :class="{ standard: type === 'standard', danger: type === 'danger' }">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  message: { type: String, required: true },
  type: { type: String, required: false, default: 'standard' }
})
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';

.nv-toast {
  border-radius: 10rem;
  padding: 5px 10px;
  font-size: small;
  font-weight: 300;
  display: grid;
  place-items: center;
}

.standard {
  background-color: white;
  color: $nevo-primary-text-color;
}

.danger {
  background-color: $red;
  color: white;
}
</style>
