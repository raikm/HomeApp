<template>
  <div class="nv-input-wrapper">
    <label class="nv-label-input">
      {{ label }}
    </label>
    <select class="nv-select" v-model="inputValue">
      <slot></slot>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: { required: true },
  label: { type: String, required: true }
})
const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    inputValue.value = props.modelValue
  }
)

watch(
  () => inputValue.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)
</script>

<style lang="scss">
.nv-select {
  padding: 5px 10px;
  border-radius: 10px;
  border-style: none;
  min-height: 2rem;
  font-size: 1rem;
  appearance: none;
}

.nv-select:focus {
  outline-width: 0;
}
</style>
