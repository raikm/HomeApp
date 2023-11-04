<template>
  <Transition>
    <div class="room-climate-wrapper" v-if="store.homeclimateSensors">
      <RoomClimate
        :room-climate="roomClimate"
        v-for="roomClimate in Object.entries(homeclimateSensorsForEachRoom)"
      />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { HassEntity } from 'home-assistant-js-websocket'
import { useHomeAssistantStore } from '~~/store/homeassistant'
import RoomClimate from './RoomClimate.vue'

export interface Rooms {
  [roomName: string]: HassEntity[]
}

const store = useHomeAssistantStore()

const homeclimateSensorsForEachRoom = computed((): Rooms => {
  return store.homeclimateSensors.reduce((groups, item) => {
    const group = groups[item.attributes.Room] || []
    group.push(item)
    groups[item.attributes.Room] = group
    return groups
  }, {})
})
</script>

<style lang="scss">
.room-climate-wrapper {
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.room-climate-wrapper::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.room-climate-wrapper {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
