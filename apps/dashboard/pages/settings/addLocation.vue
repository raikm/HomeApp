<script lang="ts" setup>
import {
  Location,
  LocationCreationParameters,
  MiFloraDevice,
  PlantCreationParameters
} from '@raikm/domain-types'
import { nvButton, nvInput, nvSelect } from '@nevo/ui'

import { useLocationService } from '~~/services/location'
const router = useRouter()
const locationService = useLocationService()

const locationCreationParameters = ref<LocationCreationParameters>({ name: '', floor: 0 })

const save = async () => {
  locationService.create(locationCreationParameters.value)
  router.back()
}
</script>

<template>
  <div>
    <h3>Adding Location</h3>

    <div class="settings-detail-container">
      <nv-input label="Name" v-model="locationCreationParameters.name" type="text" />

      <nv-input label="Floor" v-model="locationCreationParameters.floor" type="number" />

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
