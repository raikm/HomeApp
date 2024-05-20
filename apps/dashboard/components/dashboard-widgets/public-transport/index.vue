<template>
  <Transition>
    <div v-if="stopsSelected" class="public-transport-box">
      <div class="public-transport-header">
        <div class="public-transport-header-title public-transport-header-title-line">Line</div>
        <div class="public-transport-header-title public-transport-header-direction">Direction</div>
        <div class="public-transport-header-title public-transport-header-time">Time</div>
      </div>
      <div class="public-transport-content-wrapper">
        <div
          :key="transport.tripId"
          v-for="transport in departuresFromHome"
          class="public-transport-content"
        >
          <div class="public-transport-header-title-line-info">
            <div
              class="public-transport-header-title-line-info-text"
              :class="transport.line?.product"
            >
              {{ transport.line?.name }}
            </div>
          </div>
          <div class="public-transport-header-direction-info">{{ transport.direction }}</div>
          <div class="public-transport-header-time-info">
            {{ mapETATime(transport.plannedWhen) }} min
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { usePublicTransportService } from '~~/services/public-transport'
import { PublicTransportService } from '~~/services/public-transport/publicTransport.service'
import { Departure, PublicTransportProvider } from '~~/types/public-transport'
let publicTransportService: PublicTransportService

const departuresFromHome = ref<Departure[]>()

const OFFSET_IN_MINUTES = 2

let refreshInterval: NodeJS.Timer

const stopsSelected = ref(false)

onMounted(async () => {
  const selectedStopsString = localStorage.getItem('public-transport-selected-stops')
  console.log(selectedStopsString)
  stopsSelected.value = selectedStopsString?.length !== 0 ? false : false

  const selectedProvider = localStorage.getItem(
    'public-transport-selected-provider'
  ) as PublicTransportProvider

  publicTransportService = usePublicTransportService(selectedProvider)

  await refreshDepartures()

  refreshInterval = setInterval(async () => {
    await refreshDepartures()
  }, 10000) // every 10 seconds
})

onBeforeUnmount(() => {
  clearInterval(refreshInterval)
})

const refreshDepartures = async () => {
  departuresFromHome.value = []

  const stopIdsString = localStorage.getItem('public-transport-selected-stops')
  const stopIds = stopIdsString?.split(',')

  let departures = await publicTransportService.getDeparturesFromMultipleStops(stopIds)
  departures = departures.filter((d) => mapETATime(d.plannedWhen) > OFFSET_IN_MINUTES)
  departuresFromHome.value = [...departures]
}

const mapETATime = (timeString: string) => {
  let plannedTime = new Date(timeString)
  let difference = (plannedTime.getTime() - new Date().getTime()) / 1000
  difference /= 60
  return Math.abs(Math.round(difference))
}
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';

.public-transport-content-wrapper {
  overflow: scroll;
  scrollbar-width: 0;
  height: 85%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.public-transport-wrapper {
  height: 85%;
}

.public-transport-content-wrapper::-webkit-scrollbar {
  display: none;
}

.public-transport-header {
  font-size: medium;
  height: 15%;
  font-weight: bold;
}

.public-transport-header,
.public-transport-content {
  display: grid;
  grid-template-columns: 2fr 8fr 4fr;
  // height: 22px;
  column-gap: 5px;
  // font-size: $standard-text-medium;
}

.public-transport-header-title-line {
  text-align: center;
}

.public-transport-header-title-line-info-text {
  text-align: center;
}

.public-transport-header-title-line-info {
  color: white;
  margin: 2px 0;
  display: grid;
  align-content: left;
  // justify-content: center;
}

.public-transport-header-direction,
.public-transport-header-direction-info {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.public-transport-header-time,
.public-transport-header-time-info {
  text-align: right;
  justify-self: right;
}

.public-transport-header-time-info {
  font-size: $standard-text-small;
  opacity: 0.85;
}

.tram {
  background-color: rgb(230, 35, 41);
  border-radius: 4px;
  padding: 0 5px;
}

.subway {
  background-color: rgb(25, 63, 126);
  border-radius: 4px;
  padding: 0 5px;
}

.bus {
  background-color: rgb(240, 215, 34);
  border-radius: 4px;
  padding: 0 5px;
}
</style>
