<script lang="ts" setup>
import { Plant } from '@raikm/domain-types'
import { nvButton } from '@nevo/ui'
import { ref } from 'vue'
import { usePlantService } from '~~/services/plant'
const plantService = usePlantService()
const plants = ref<Plant[]>([])

onMounted(async () => {
  plants.value = await plantService.getAll()
})
</script>

<template>
  <h3>Plant Sensors</h3>
  <div v-if="plants.length > 0" class="list-container">
    <NuxtLink v-for="plant in plants" class="list-row" :to="`editPlant/${plant.id}`">
      <div class="list-row-left">
        <div class="list-row-name">{{ plant.name ?? 'Undefined' }}</div>
        <div class="list-row-room">{{ plant.location?.name }}</div>
      </div>
      <div class="list-row-right">
        <div class="list-row-version">
          {{ plant.version }}
        </div>
      </div>
      <div class="list-row-details-icon">〉</div>
    </NuxtLink>

    <div class="add-new-entry-row"><NuxtLink to="addPlant">+ Add new Plant</NuxtLink></div>
  </div>
  <div class="empty-list-container" v-else>
    <div class="empty-list-info">
      <h3>No plants added yet</h3>
      <nv-button><NuxtLink to="addPlant">+ Add new Plant</NuxtLink></nv-button>
    </div>
  </div>
</template>

<style lang="scss">
@import '@nevo/style/variables.scss';
</style>
