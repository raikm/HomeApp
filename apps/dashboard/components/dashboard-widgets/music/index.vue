<template>
  <Transition>
    <div class="music-wrapper">
      <div class="music-main">
        <template v-if="musicPlaying || latestActiveGroup">
          <Player
            :activeGroup="activeGroup"
            :latestActiveGroup="latestActiveGroup"
            @update-zones="updateZones"
            @standby="showStandbyScreen"
          />
        </template>
        <template v-else>
          <Shortcuts></Shortcuts>
        </template>
      </div>
      <div class="music-footer"></div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useSonosService } from '../../../services/sonos/index'
import { Zone } from '../../../types/sonosTypes'

const sonosService = useSonosService()

const zones = ref<Zone[]>([])

const musicPlaying = computed(() => {
  return activeGroup.value == null ? false : true
})

const activeGroup = computed(() => {
  return (
    zones.value.filter((zone: Zone) =>
      zone.coordinator.state != null ? zone.coordinator.state.playbackState === 'PLAYING' : []
    )[0] || null
  )
})

const latestActiveGroup = ref<Zone>()

const showStandbyScreen = () => {}

const updateZones = async () => {
  latestActiveGroup.value = activeGroup.value
  zones.value = await sonosService.getZones()
}

onMounted(async () => {
  await updateZones()
})
</script>

<style lang="scss">
.music-main {
  height: 100%;
}

.player-wrapper {
  height: 100%;
}

#volume-control::-webkit-slider-thumb {
  -webkit-appearance: none;
  -webkit-touch-appearance: none;
  width: 0px;
  // color: #fff;
  //  border: 0 !important;
  //  background-color:#fff !important;
  background-color: #fff;
  box-shadow: -100vw 0 0 100vw #ffffff;
  cursor: none;
}
.music-control-box {
  height: 100%;
  width: 100%;
  display: grid;
}
#music-control {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
