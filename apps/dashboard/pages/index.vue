<template>
  <div id="dashboard-wrapper">
    <div id="boxes">
      <DashboardWidgetsHomeClimate class="box dashboard-box main-box" />
      <DashboardWidgetsWeather class="box dashboard-box box-s" />
      <DashboardWidgetsRoomLightController
        v-if="homeAssistantStore.haConnection"
        class="box dashboard-box box-s main-box"
      />
      <DashboardWidgetsPublicTransport class="box dashboard-box box-m main-box" />
      <DashboardWidgetsCalendar class="box dashboard-box box-m main-box" />
      <!-- <DashboardWidgetsMusic class="box dashboard-box box-m main-box" /> -->
    </div>
    <div id="shortcuts">
      <Shortcut :shortcut="shortcut" v-for="shortcut in homeAssistantStore.shortcutEntities" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Shortcut from '~~/components/Shortcut.vue'
import { useSpotifyService } from '../services/spotify/index'
import { useHomeAssistantStore } from '../store/homeassistant'
import { useStore } from '../store/index'

const homeAssistantStore = useHomeAssistantStore()
const store = useStore()
const spotifyService = useSpotifyService(store)
// TODO if (window.location.search.length > 0) {
//   spotifyService.handleSpotifyRedirect();
// }
</script>

<style lang="scss" scoped>
@import '@nevo/style/main.scss';
@import '@nevo/style/variables.scss';
// 22rem is one box
#dashboard-wrapper {
  max-width: calc(66rem + 8rem);
  position: relative;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#dashboard-wrapper::-webkit-scrollbar {
  display: none;
}

#boxes {
  display: grid;
  column-gap: 1rem;
  row-gap: $box-gap;
  row-gap: 1rem;
  grid-template-columns: $box-width $box-width $box-width;
  flex-wrap: wrap;
}

#shortcuts {
  position: absolute;
  bottom: 0px;
  width: 100%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  display: inline-flex;
  overflow: scroll;
  display: inline-flex;
  column-gap: $standard-space;
}

#shortcuts::-webkit-scrollbar {
  display: none;
}

#__nuxt {
  display: grid;
  grid-template-rows: 10% 85% 5%;
  height: 100%;
  max-width: 100rem;
  margin: auto;
}
</style>
