<template>
  <div class="nv-input-wrapper">
    <div class="nv-label-input">
      {{ label }}
    </div>
    <input class="nv-input" v-model="inputValue" :type="type" />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: { required: true },
  label: { type: String, required: true },
  type: { type: String, required: false, default: 'text' }
})
const inputValue = ref(props.modelValue)

// updates modelValue if value gets changed from the editor window
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
@import '@nevo/style/variables.scss';

.nv-input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
}

.nv-label-input {
  padding: 5px 8px;
  width: 7rem;
  font-weight: 450;
}

.nv-label-input {
  font-size: 1rem;
  display: grid;
  align-items: center;
}
.nv-input {
  padding: 5px 10px;
  border-radius: 10px;
  border-style: none;
  min-height: 2rem;
  font-size: 1rem;
}

.nv-input:focus {
  outline-width: 0;
}
</style>
