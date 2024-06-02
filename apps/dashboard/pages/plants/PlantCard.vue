<template>
  <div
    v-if="measurements"
    class="plant-card-wrapper flex flex-col bg-white dark:bg-slate-800 text-black dark:text-white"
  >
    <div class="plant-card-header">
      <div class="font-bold hyphens-auto" lang="de">{{ name }}</div>
      <div v-if="measurementsOld" class="plant-card-status">⬤</div>
    </div>
    <div class="plant-card-parameter content-end">
      <div class="plant-card-parameter-humidity">
        <h6 class="dark:text-white">Moisture</h6>
        <div class="bar-text">
          <PlantCardProgressBar
            barColor="#448cdb"
            :value="measurements.soilMoisture > 0 ? measurements.soilMoisture : 0"
          ></PlantCardProgressBar>

          <div class="value-in-text">
            {{ measurements.soilMoisture > 0 ? measurements.soilMoisture.toFixed(0) : 0 }}%
          </div>
        </div>
      </div>
      <div class="plant-card-parameter-fertility">
        <h6 class="dark:text-white">Fertility</h6>
        <div class="bar-text">
          <PlantCardProgressBar
            barColor="#d07561"
            :value="measurements.soilFertility > 0 ? measurements.soilFertility : 0"
          ></PlantCardProgressBar>
          <div class="value-in-text">
            {{ measurements.soilFertility > 0 ? measurements.soilFertility.toFixed(0) : 0 }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Measurement } from '@raikm/domain-types'
import PlantCardProgressBar from './PlantCardProgressBar.vue'
import { usePlantService } from '~~/services/plant'

const plantService = usePlantService()

const { id } = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true }
})
const measurements = ref<Measurement | null>()

measurements.value = await plantService.getLastMeasurements(id)

// measurements.value = {
//   plantId: '1',
//   battery: 100,
//   soilFertility: 200,
//   soilMoisture: 200,
//   sunlight: 80,
//   temperature: 19,
//   time: new Date()
// }

// TODO correct validation
const measurementsOld = ref(false)
if (measurements.value) {
  measurementsOld.value =
    new Date(measurements.value.datetime) < new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
}
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';

.plant-card-wrapper {
  // width: calc($box-width / 2);
  height: 6.5rem;
  border-radius: $standard-border-radius;
  padding: 8px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.plant-card-header {
  display: grid;
  grid-template-columns: 85% auto;
  margin-bottom: 0.25rem;
}

.plant-card-battery {
  width: 1rem;
  height: 0.3rem;
  background-color: rgb(32, 190, 32);
  border-radius: 0.1rem;
  align-self: center;
}

.plant-card-status {
  justify-self: right;
  color: $red;
  font-size: xx-small;
}

.plant-card-parameter {
  border-radius: calc($standard-border-radius / 2);
  height: 4rem;
  display: grid;
  grid-template-columns: 49% 49%;
  gap: 2%;
}

.bar-text {
  display: flex;
  gap: 2px;
}

.value-in-text {
  font-size: xx-small;
  padding: 2px;
  display: grid;
  place-items: center;
}
</style>
