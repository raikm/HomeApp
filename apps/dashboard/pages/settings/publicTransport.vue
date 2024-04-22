<template>
  <select v-model="selectedProvider">
    <option :value="provider" v-for="provider in providers">{{ provider }}</option>
  </select>
  <br />

  <input v-model="address" />
  <br />
  <select v-model="selectedStopWithName">
    <option :value="stop" v-for="stop in stops">{{ stop.name }}</option>
  </select>
  <br />
  <select v-model="selectedStopsToWatch" multiple>
    <option :value="stop" v-for="stop in stopsNearby">{{ stop.name }}</option>
  </select>

  {{ selectedStopsToWatch }}
</template>

<script lang="ts" setup>
import { usePublicTransportService } from '~~/services/public-transport'
import { PublicTransportProvider, StopOrDestination } from '~~/types/public-transport'

const providers = ref<Array<PublicTransportProvider>>(['BVG'])
const selectedProvider = ref<PublicTransportProvider>()

const publicTransportService = usePublicTransportService(selectedProvider.value)

const address = ref('schwedterstraße')

const stops = ref<Array<StopOrDestination>>([])
const selectedStopWithName = ref<StopOrDestination>()
const stopsNearby = ref<Array<StopOrDestination>>([])

const selectedStopsToWatch = ref<StopOrDestination[]>()

onMounted(async () => {
  // quickfix:
  selectedProvider.value = providers.value[0]

  const selectionNameId = localStorage.getItem('public-transport-selected-stop-with-name')
  selectedStopWithName.value = stops.value.find((stop) => stop.id === selectionNameId)
  // prefill selectedStopsToWatch
})
watch(selectedProvider, async () => {
  localStorage.setItem('public-transport-selected-provider', selectedProvider.value)
  stops.value = await publicTransportService.getBvgStopsWithName(address.value)
})

watch(selectedStopWithName, async () => {
  stopsNearby.value = await publicTransportService.getBvgStopsNearby(
    selectedStopWithName.value.location.latitude,
    selectedStopWithName.value.location.longitude
  )
  localStorage.setItem('public-transport-selected-stop-with-name', selectedStopWithName.value.id)
})

watch(selectedStopsToWatch, () => {
  localStorage.setItem(
    'public-transport-selected-stops',
    selectedStopsToWatch.value.map((stop) => stop.id).toString()
  )
})
</script>
