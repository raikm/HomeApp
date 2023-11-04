<template>
  <div class="room-climate-container">
    <div class="widget-regular-header">{{ roomClimate[0] }}</div>
    <div class="sensor-value-wrapper">
      <div class="sensor-value" :class="sensor.attributes.device_class" v-for="sensor in sensors">
        <template v-if="sensor.state !== 'unavailable'">
          {{ sensor.state }}{{ sensor.attributes.unit_of_measurement }}
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { HassEntity } from 'home-assistant-js-websocket'

const { roomClimate } = defineProps<{ roomClimate: [string, HassEntity[]] }>()
const sensors = roomClimate[1]
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';

.room-climate-container {
  margin-bottom: 1rem;
}

.sensor-value-wrapper {
  display: inline-flex;
  gap: 0.5rem;
}

.sensor-value {
  border-radius: 5px;
  width: 4rem;
  display: grid;
  place-items: center;
  background-color: $light-gray;
  padding: 2px;
}

// .temperature {
//   background-color: $red;
// }

// .humidity {
//   background-color: $blue;
// }

// .speed {
//   background-color: $gray;
// }
</style>
