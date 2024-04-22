<template>
  <div class="slider" aria-valuemin="0" aria-valuemax="1" aria-valuetext="0" aria-valuenow="0">
    <input
      class="slider-input"
      id="slider-input"
      type="range"
      min="0"
      max="100"
      v-model="sliderValue"
      step="1"
    />
    <progress class="slider-progress" min="0" max="100" :value="sliderValue" />
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'

const props = defineProps<{ sliderValue: number }>()

const emit = defineEmits(['change-slider-value'])

watch(
  () => props.sliderValue,
  (newValue) => {
    emit('change-slider-value', newValue)
  }
)
</script>

<style lang="scss" scoped>
.slider {
  align-items: center;
  position: relative;
  // height: 100%;
  // width: 100%;

  // .slider-input {
  //   position: inherit;
  //   width: 100%;
  // }
}

progress {
  -webkit-appearance: none;
  appearance: none;
  // position: absolute;
  // display: block;
  margin: 0;
  // top: 13px;
  // left: 13px;
  width: 100%;
  height: 3px;
  z-index: -1;
  background-color: #b6b6b6;
}

progress::-webkit-progress-value {
  background-color: #4168d2;
}
progress::-moz-progress-bar {
  background-color: #4168d2;
  top: 50%;
}

progress {
  background-color: #4168d2;
  z-index: 1;
}

progress::-webkit-progress-bar {
  background-color: #b6b6b6;
  border-radius: 1.5px;
  overflow: hidden;
}

input {
  -webkit-appearance: none;
  appearance: none;
  touch-action: pan-y;
  position: absolute;
  margin: 0;
  padding: 0;
  width: 92%;
  z-index: 2;
  background-color: transparent;
}

input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 28px;
  width: 28px;
  border: none;
  border-radius: 50%;
  background-color: rgb(241, 241, 241);
  z-index: 2;
  box-shadow: var(--thumb-shadow);
}
</style>
