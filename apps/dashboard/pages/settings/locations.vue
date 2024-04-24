<script lang="ts" setup>
import { Location } from '@raikm/domain-types'
import { nvButton } from '@nevo/ui'
import { ref } from 'vue'
import { useLocationService } from '~~/services/location'
const roomService = useLocationService()
const locations = ref<Location[]>([])

onMounted(async () => {
  locations.value = await roomService.getAll()
})
</script>

<template>
  <h3>Plant Sensors</h3>
  <div v-if="locations.length > 0" class="list-container">
    <NuxtLink v-for="location in locations" class="list-row" :to="`editLocation/${location.id}`">
      <div class="list-row-left">
        <div class="list-row-name">{{ location.name ?? 'Undefined' }}</div>
        <div class="list-row-room">Floor: {{ location.floor }}</div>
      </div>
      <div class="list-row-right">
        <div class="list-row-version"></div>
      </div>
      <div class="list-row-details-icon">〉</div>
    </NuxtLink>

    <div class="add-new-entry-row"><NuxtLink to="addLocation">+ Add new Location</NuxtLink></div>
  </div>
  <div class="empty-list-container" v-else>
    <div class="empty-list-info">
      <h3>No plants added yet</h3>
      <nv-button><NuxtLink to="addLocation">+ Add new Location</NuxtLink></nv-button>
    </div>
  </div>
</template>

<style lang="scss">
@import '@nevo/style/variables.scss';
</style>
