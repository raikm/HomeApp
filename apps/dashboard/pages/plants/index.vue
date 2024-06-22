<template>
  <div class="max-w-screen-lg">
    <div class="grid place-content-end">
      <nv-button @click="refreshData">
        <svg
          :class="loading ? 'animate-spin' : ''"
          class="size-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </nv-button>
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
const loading = ref(false)

const refreshData = async () => {
  loading.value = true
  await plantService.refreshMeasurements()
  loading.value = false
}

onMounted(async () => {
  plants.value = await plantService.getAll()
  locations.value = await plantService.getAllLocations()
})
</script>
