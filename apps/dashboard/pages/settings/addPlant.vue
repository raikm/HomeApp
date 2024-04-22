<script lang="ts" setup>
import { Location, MiFloraDevice, PlantCreationParameters } from '@raikm/domain-types'
import { nvButton, nvInput, nvSelect } from '@nevo/ui'

import { usePlantService } from '~~/services/plant'
const router = useRouter()
const plantService = usePlantService()
const sensors = ref<MiFloraDevice[]>()
const locations = ref<Location[]>()
const requestingSensors = ref(false)
const selectedLocation = ref<Location>()
let requestInterval: NodeJS.Timer

onMounted(async () => {
  await getNearbySensors(5000)

  requestInterval = setInterval(async () => {
    await getNearbySensors(5000)
  }, 5000)

  locations.value = await plantService.getAllLocations()
})

onUnmounted(() => {
  clearInterval(requestInterval)
})

const requestBlinking = ref(false)
const blinkingInProgress = ref(false)
const blinking = async () => {
  requestBlinking.value = true

  await plantService.blinking(plantCreationParameters.value.address)

  requestBlinking.value = false
  blinkingInProgress.value = true
  setTimeout(() => {
    blinkingInProgress.value = false
  }, 5000)
}

const getNearbySensors = async (duration: number) => {
  requestingSensors.value = true
  try {
    sensors.value = await plantService.discover(duration)
    if (sensors.value.length === 0) {
      await getNearbySensors(10000)
    }
  } catch (err: any) {}
  requestingSensors.value = false
}

const plantCreationParameters = ref<PlantCreationParameters>({ name: '', address: '', version: '' })
const selectSensor = (device: MiFloraDevice) => {
  clearInterval(requestInterval)
  plantCreationParameters.value.address = device.address
  plantCreationParameters.value.version = '0.0.0'
}

watch(selectedLocation, (currentValue) => {
  plantCreationParameters.value.location = currentValue
})

const save = async () => {
  plantService.create(plantCreationParameters.value)
  router.back()
}
</script>

<template>
  <div>
    <h3>Adding plant sensors</h3>
    <div class="plant-list-header">
      <template v-if="requestingSensors">
        <loading />
      </template>
    </div>
    <!--  -->
    <div v-if="requestingSensors || sensors != null" class="list-container">
      <div
        v-if="requestingSensors && (sensors == null || sensors?.values.length === 0)"
        class="plant-sensor-searching-placeholder"
      >
        Searching for nearby Sensors ...
      </div>
      <div
        v-if="!requestingSensors && sensors?.length == 0"
        class="plant-sensor-searching-placeholder"
      >
        No Sensors found
      </div>
      <div
        class="list-row"
        :class="{ 'selected-sensor': sensor.address === plantCreationParameters.address }"
        @click="selectSensor(sensor)"
        v-for="sensor in sensors"
      >
        <div class="list-row-left">
          <div class="list-row-name">{{ sensor.name ?? 'Undefined' }}</div>
          <div class="list-row-room">{{ sensor.address }}</div>
        </div>
      </div>
    </div>

    <div v-if="plantCreationParameters.address.length > 0" class="settings-detail-container">
      <nv-input label="Name" v-model="plantCreationParameters.name" type="text" />
      <!-- location selector -->
      <nv-select label="Room" v-model="selectedLocation">
        <option v-for="location in locations" :value="location">{{ location.name }}</option>
      </nv-select>
      <div class="settings-detail-sub">
        <nv-button @click="blinking">
          <template v-if="!requestBlinking && !blinkingInProgress">Blink</template>
          <template v-else-if="requestBlinking && !blinkingInProgress"><Loading /></template>
          <template v-else-if="!requestBlinking && blinkingInProgress">blinking</template>
        </nv-button>
      </div>
      <div class="settings-detail-sub">
        <nv-button @click="save">Save</nv-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@nevo/style/variables.scss';

.plant-list-header {
  display: grid;
  justify-items: right;
  height: 100%;
  margin-bottom: 1rem;
}

.loader {
  width: 1rem;
  height: 1rem;
  border: 2px solid #000000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  to {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}
.rotating {
  -webkit-animation: rotating 1s linear infinite;
  -moz-animation: rotating 1s linear infinite;
  -ms-animation: rotating 1s linear infinite;
  -o-animation: rotating 1s linear infinite;
  animation: rotating 1s linear infinite;
}

.plant-sensor-searching-placeholder {
  display: grid;
  align-items: center;
}

.selected-sensor {
  color: $nevo-primary-color-light;
}
</style>
