<template>
  <div>
    <div class="plants-for-location" v-for="location in locations">
      <h3 v-if="plants.filter((p) => p.location?.id === location.id).length > 0">
        {{ location.name }}
      </h3>
      <div class="plants-per-room">
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
import { Location, Plant } from '@nevo/domain-types'
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

<style lang="scss">
@import '@nevo/style/variables.scss';
.plants-per-room {
  display: flex;
  gap: $box-gap;
  flex-wrap: wrap;
}
</style>
