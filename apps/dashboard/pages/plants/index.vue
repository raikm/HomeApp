<template>
  <div class="max-w-screen-lg">
    <div class="grid place-content-end">
      <nv-button @click="plantService.refreshMeasurements()">Refresh</nv-button>
    </div>
    <div class="flex flex-col gap-2 my-4" v-for="location in locations">
      <h3
        class="text-black dark:text-white"
        v-if="plants.filter((p) => p.location?.id === location.id).length > 0"
      >
        {{ location.name }}
      </h3>
      <div class="w-full grid grid-cols-6 gap-4 flex-wrap">
        <PlantCard
          v-for="plant in plants?.filter((p) => p.location?.id === location.id)"
          :name="plant.name"
          :id="plant.id"
        >
        </PlantCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nvButton } from '@nevo/ui'
import { Location, Plant } from '@raikm/domain-types'
import { usePlantService } from '~~/services/plant'
import PlantCard from './PlantCard.vue'

const plantService = usePlantService()
const plants = ref<Plant[]>([])
const locations = ref<Location[]>()

onMounted(async () => {
  plants.value = await plantService.getAll()
  locations.value = await plantService.getAllLocations()
})
</script>
