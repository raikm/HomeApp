<template>
  <div class="player-wrapper" v-if="currentTrack.length !== 0">
    <div id="player">
      <div id="title-info-container">
        <div id="cover-img">
          <img id="album-cover" :src="currentTrack.absoluteAlbumArtUri" />
        </div>
        <div id="title-info">
          <div class="track-information-line" id="location">
            <div>{{ activeSpeakerNames }}</div>
          </div>
          <div class="track-information-line" id="title">
            <div>{{ currentTrack.title }}</div>
          </div>
          <div class="track-information-line" id="artist">
            <div>{{ currentTrack.artist }} - {{ currentTrack.album }}</div>
          </div>
        </div>
      </div>
      <div id="duration-info">
        <div class="play-duration">{{ currentTrackSecondsString }}</div>
        <div id="progress-track-wrapper">
          <div
            id="progress-track"
            :style="{
              width: (currentTrackSeconds / currentTrack.duration) * 100 + '%',
              maxWidth: '100%'
            }"
          ></div>
        </div>
        <div class="play-duration">{{ endTrackTime }}</div>
      </div>

      <div id="player-control">
        <!-- <svg
          @click="$emit('showPlaylists')"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 62.246 62.246"
          style="enable-background:new 0 0 62.246 62.246;"
          xml:space="preserve"
        >
          <g>
            <path
              d="M57.548,45.107H19.965c-2.595,0-4.699,2.105-4.699,4.701c0,2.594,2.104,4.699,4.699,4.699h37.583
		c2.594,0,4.698-2.105,4.698-4.699C62.246,47.213,60.142,45.107,57.548,45.107z"
            />
            <path
              d="M57.548,26.402H19.965c-2.595,0-4.699,2.104-4.699,4.7c0,2.595,2.104,4.699,4.699,4.699h37.583
		c2.594,0,4.698-2.104,4.698-4.699S60.142,26.402,57.548,26.402z"
            />
            <path
              d="M19.965,17.096h37.583c2.594,0,4.698-2.104,4.698-4.7s-2.104-4.699-4.698-4.699H19.965c-2.595,0-4.699,2.104-4.699,4.699
		C15.266,14.991,17.37,17.096,19.965,17.096z"
            />
            <circle cx="4.77" cy="12.439" r="4.77" />
            <circle cx="4.77" cy="31.102" r="4.769" />
            <circle cx="4.77" cy="49.807" r="4.77" />
          </g>
        </svg>-->
        <div></div>

        <svg
          @click="previous"
          width="126"
          height="108"
          viewBox="0 0 126 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.03 0.686005C6.742 0.686005 0.0220032 7.405 0.0220032 15.694V92.312C0.0220032 100.6 6.741 107.32 15.03 107.32C23.319 107.32 30.038 100.601 30.038 92.312V54.003V15.694C30.038 7.405 23.319 0.686005 15.03 0.686005Z"
            fill="#070405"
          />
          <path
            d="M120.33 1.87201C118.876 1.03301 117.254 0.613007 115.632 0.613007C114.01 0.613007 112.388 1.03301 110.935 1.87201L34.735 45.866C31.828 47.544 30.037 50.646 30.037 54.002C30.037 57.358 31.828 60.46 34.735 62.138L110.935 106.132C112.388 106.971 114.01 107.391 115.632 107.391C117.254 107.391 118.876 106.971 120.33 106.132C123.237 104.454 125.027 101.352 125.027 97.996V10.008C125.028 6.652 123.237 3.55001 120.33 1.87201Z"
            fill="#070405"
          />
        </svg>

        <svg
          v-if="activeGroupState.playbackState == 'PLAYING'"
          @click="pause"
          width="76"
          height="108"
          viewBox="0 0 76 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.413 0.753998C7.12399 0.753998 0.404999 7.473 0.404999 15.762V92.38C0.404999 100.668 7.12399 107.388 15.413 107.388C23.701 107.388 30.42 100.669 30.42 92.38V15.761C30.42 7.473 23.701 0.753998 15.413 0.753998Z"
            fill="#070405"
          />
          <path
            d="M60.435 0.753998C52.147 0.753998 45.427 7.473 45.427 15.762V92.38C45.427 100.668 52.146 107.388 60.435 107.388C68.724 107.388 75.443 100.669 75.443 92.38V15.761C75.443 7.473 68.724 0.753998 60.435 0.753998Z"
            fill="#070405"
          />
        </svg>
        <svg
          v-else
          @click="resume"
          width="96"
          height="108"
          viewBox="0 0 96 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.685 106.128C7.138 106.967 8.761 107.387 10.383 107.387C12.005 107.387 13.627 106.967 15.081 106.128L91.28 62.134C94.187 60.456 95.978 57.354 95.978 53.997C95.978 50.641 94.187 47.539 91.28 45.861L15.08 1.867C13.626 1.028 12.005 0.608002 10.382 0.608002C8.75999 0.608002 7.13799 1.028 5.68399 1.867C2.77699 3.545 0.985992 6.647 0.985992 10.003V97.991C0.987992 101.348 2.779 104.45 5.685 106.128Z"
            fill="#070405"
          />
        </svg>
        <svg
          @click="next"
          width="126"
          height="108"
          viewBox="0 0 126 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M110.97 0.686005C102.682 0.686005 95.962 7.405 95.962 15.694V54.003V92.312C95.962 100.6 102.681 107.32 110.97 107.32C119.258 107.32 125.978 100.601 125.978 92.312V15.694C125.978 7.405 119.258 0.686005 110.97 0.686005Z"
            fill="#070405"
          />
          <path
            d="M91.265 45.866L15.065 1.87201C13.612 1.03301 11.99 0.613007 10.368 0.613007C8.74601 0.613007 7.12401 1.03301 5.67001 1.87201C2.76301 3.55001 0.972992 6.652 0.972992 10.008V97.996C0.972992 101.352 2.76401 104.454 5.67001 106.132C7.12401 106.971 8.74601 107.391 10.368 107.391C11.99 107.391 13.612 106.971 15.065 106.132L91.265 62.138C94.172 60.46 95.962 57.358 95.962 54.002C95.962 50.646 94.171 47.544 91.265 45.866Z"
            fill="#070405"
          />
        </svg>
        <!-- <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2 7.20001C16.3 8.10001 16 18.3 16 47C16 90.3 15.7 88.6 23.4 92.1C27 93.7 30.2 94 50 94C69.8 94 73 93.7 76.6 92.1C84.3 88.6 84 90.3 84 47C84 18.3 83.7 8.10001 82.8 7.20001C81.1 5.50001 18.9 5.50001 17.2 7.20001ZM80 13V16H50H20V13V10H50H80V13ZM80 51V82H50H20V51V20H50H80V51ZM78 86.6C78 86.9 76.4 87.8 74.5 88.6C69.5 90.6 30.5 90.6 25.5 88.6C23.6 87.8 22 86.9 22 86.6C22 86.2 34.6 86 50 86C65.4 86 78 86.2 78 86.6Z"
            fill="black"
          />
        </svg>-->
        <div></div>
      </div>
      <div class="slider-wrapper">
        <volume-slider :sliderValue="activeGroupState.volume" @change-slider-value="updateVolume" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useSonosService } from '../../../services/sonos/index'
import { CurrentTrack, Speaker, Zone } from '../../../types/sonosTypes'
import VolumeSlider from './VolumeSlider.vue'

const sonosService = useSonosService()
const zones = ref<Zone[]>([])

const props = defineProps<{ activeGroup: Zone; latestActiveGroup: Zone }>()

const speakers = computed(() => {
  let speakers: Speaker[] = []

  zones.value.forEach((zone: Zone) => {
    zone.members.forEach((member: Speaker) => {
      speakers.push(member)
    })
  })

  speakers.sort((a: Speaker, b: Speaker) => a.roomName.localeCompare(b.roomName))

  return speakers
})

const activeGroupState = computed(() => {
  return props.activeGroup != null ? (props.activeGroup as any).coordinator.state : null
}) // TODO
const currentTrack = computed(() => {
  {
    return activeGroupState.value != null
      ? (activeGroupState.value as any).currentTrack
      : props.latestActiveGroup.coordinator.state.currentTrack
  }
})
const volumeOfActiveZone = computed(() => {
  return activeGroupState.value != null ? (activeGroupState.value as any).volume : 0
})

const activeSpeakerNames = computed(() => {
  let result = ''
  for (let index = 0; index < props.activeGroup.members.length - 1; index++) {
    result += props.activeGroup.members[index].roomName + ', '
  }
  result += props.activeGroup.members[props.activeGroup.members.length - 1].roomName
  return result
})

// TODO watch sonos changes
// const socket: Socket = inject('socket')!
// const emit = defineEmits(['update-zones', 'showPlaylists', 'standby'])

// socket.on('change', (data) => {
//   let result = JSON.parse(data.toString())

//   // getZones()
//   emit('update-zones')
//   updateTimeInfos()
//   if (result.type === 'transport-state') {
//     // snapshot of player
//     // getZones()
//   } else if (result.type === 'topology-change') {
//     // snapshot of zones
//   } else if (result.type === 'volume-change') {
//   }
// })

// actions
const resume = async () => {
  const roomName =
    props.activeGroup != null
      ? props.activeGroup.coordinator.roomName
      : props.latestActiveGroup.coordinator.roomName
  await sonosService.resume(roomName)
}

const pause = () => {
  emit('standby')
  sonosService.pauseMusic(props.activeGroup.coordinator.roomName)
}

const next = () => {
  sonosService.nextTrack(props.activeGroup.coordinator.roomName)
}

const previous = () => {
  sonosService.previousTrack(props.activeGroup.coordinator.roomName)
}

const updateVolume = (newVolume: number) => {
  console.log(newVolume)
  sonosService.updateVolume(props.activeGroup.coordinator.roomName, newVolume)
}

const currentTrackSeconds = ref(0)
const currentTrackSecondsString = ref('')
const endTrackTime = ref('')
const interval = ref(0)

onMounted(() => {
  interval.value = setInterval(() => {
    updateSecondsInCurrentTrack()
  }, 1000)
})
onUnmounted(() => {
  clearInterval(interval.value)
})

//watch
// activeGroupState.value.elapsedTime
watch(
  () => activeGroupState.value,
  () => {
    if (activeGroupState) currentTrackSeconds.value = activeGroupState.value.elapsedTime
  }
)

const updateSecondsInCurrentTrack = () => {
  currentTrackSeconds.value += 1
  elapsedTimeToFormatedString()
}

const elapsedTimeToFormatedString = () => {
  currentTrackSecondsString.value = getFormatedTimeString(currentTrackSeconds.value)
}

const endTimeToFormatedString = () => {
  endTrackTime.value = getFormatedTimeString((currentTrack.value as CurrentTrack).duration)
}

const getFormatedTimeString = (seconds: number) => {
  let durationTime = new Date(0)
  durationTime.setHours(0)
  durationTime.setSeconds(seconds)
  const durationTimeString = durationTime.toLocaleTimeString()
  if (durationTimeString?.split(':')[1][0] === '0') return durationTimeString.slice(4, 8)
  return durationTimeString.slice(3, 8)
}

const updateTimeInfos = () => {
  currentTrackSeconds.value = activeGroupState.value.elapsedTime
  endTimeToFormatedString()
}

endTimeToFormatedString()
</script>

<style lang="scss">
.player-wrapper {
  // height: 100%;
  // overflow: hidden;
}
#player {
  height: 100%;
  display: grid;
  grid-template-rows: 42% 10% 19% 20%;
  row-gap: 2%;
}
#speakers {
  height: 100%;
  display: none;
  grid-template-rows: 65% 20% 15%;
  row-gap: 2%;
}
.track-information-line {
  // overflow: hidden;
  margin-top: 3px;
  // display: -webkit-box;
  // -webkit-line-clamp: 1;
  // -webkit-box-orient: vertical;
}
#player-control {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0%;
  justify-items: center;
  align-content: center;
  height: 100%;
}

#player-control > svg {
  height: 20px;
  width: 20px;
}

#cover-img {
  display: grid;
}
#album-cover {
  align-self: flex-end;
  border-radius: 5px;
  height: 80px;
  width: 80px;
}
#title-info-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 5%;
  // height: 100%;
  // width: 100%;
  overflow: hidden;
}
#title-info {
  align-self: flex-end;
  // padding-bottom: 5%;
  width: 100%;
  // display: grid;
  // justify-content: baseline;
}
#location {
  font-size: x-small;
  opacity: 70%;
}
#artist {
  font-size: x-small;
  width: 100%;

  overflow: hidden;
}
#duration-info {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 8fr 1fr;
  margin: 5% 0%;
}
.play-duration {
  font-size: 10px;
  justify-self: center;
  align-self: center;
}
#current-music-play-icon {
  justify-self: right;
}
#progress-track-wrapper {
  width: 100%;
  // margin: 0 5%;
  height: 3px;
  background-color: #ddd;
  border-radius: 10px;
  border: 0px solid;
  align-self: center;
}
#progress-track {
  max-width: 100%;
  border-radius: 10px;
  border: 0px solid;
  height: 3px;
  background-color: rgb(73, 157, 255);
}
.play-icon {
  height: 50%;
  fill: rgb(72, 72, 72);
  justify-self: center;
  align-self: center;
}
.speaker-icon {
  height: 65%;
  justify-self: center;
  align-self: center;
}
.speaker-icon-small {
  height: 1.5vh;
  justify-self: center;
  align-self: center;
}
#play {
  fill: rgb(72, 72, 72);
}
#playlist-icon {
  justify-self: center;
  align-self: center;
  font-size: 140%;
  color: rgb(72, 72, 72);
}
#volume-control-wrapper {
  // max-height: 10vh;
  position: relative;
}
#volume-icon-container {
  height: 100%;
  position: absolute;
  z-index: 99;
  pointer-events: none;
}
#volume-icon {
  // height: 2vh;
  margin: 1.5vh;
  fill: lightgray;
}
#volume-control {
  position: absolute;
  z-index: 98;
  height: 100%;
  width: 100%;
}
.player-icon-inactive {
  pointer-events: none;
  fill: rgba(72, 72, 72, 0.459);
}

.slider-wrapper {
  // width: 100%;
}
</style>
