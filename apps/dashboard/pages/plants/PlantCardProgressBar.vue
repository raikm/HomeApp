<template>
  <div class="progress-bar-container">
    <div class="progress-bar-background">
      <div
        class="progress-bar"
        :style="{
          width:
            //if value over minimum and at least 2% then show bar
            (value - valueMinBorder > 0 && (value / valueMaxBorder) * 100 > 2
              ? (value / valueMaxBorder) * 100
              : 0) + '%',
          backgroundColor: barColor
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  barColor: { type: String, required: true },
  valueMinBorder: { type: Number, required: true },
  valueMaxBorder: { type: Number, required: true },
  value: { type: Number, required: true }
})
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';

.progress-bar-container {
  width: 100%;
  height: 0.3rem;
  margin: 0.2rem 0;
  align-self: center;
}

.progress-bar {
  animation: load 2s normal forwards;
  height: 100%;
  border-radius: $standard-border-radius;
  opacity: 85%;
  font-size: 50%;
  text-align: right;
  display: grid;
  align-content: center;
  max-width: 100%;

  @keyframes load {
    0% {
      width: 0;
    }
    100% {
      width: (#{width});
    }
  }
}

.progress-bar-background {
  height: 100%;
  background-color: $light-gray;
  border-radius: $standard-border-radius;
}
</style>
