<template>
  <div v-if="measurements" class="plant-card-wrapper">
    <div class="plant-card-header">
      <div class="plant-card-name">{{ name }}</div>
      <div v-if="measurementsOld" class="plant-card-status">⬤</div>
    </div>
    <div class="plant-card-parameter">
      <div class="plant-card-parameter-humidity">
        <h6>Moisture</h6>
        <div class="bar-text">
          <PlantCardProgressBar
            barColor="#448cdb"
            :value="measurements.soilMoisture"
          ></PlantCardProgressBar>

          <div class="value-in-text">
            {{ measurements.soilMoisture > 0 ? measurements.soilMoisture.toFixed(0) : 0 }}%
          </div>
        </div>
      </div>
      <div class="plant-card-parameter-fertility">
        <h6>Fertility</h6>
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
  width: $box-width / 2;
  height: 4rem;
  background-color: $white;
  border-radius: $standard-border-radius;
  display: flex;
  flex-direction: column;
  padding: 8px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.plant-card-header {
  height: 2rem;
  display: grid;
  grid-template-columns: 85% auto;
  margin-bottom: 0.25rem;
}

.plant-card-name {
  font-weight: bold;
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
  border-radius: $standard-border-radius / 2;
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
