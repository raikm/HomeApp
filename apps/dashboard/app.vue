<template>
  <div id="header">
    <Menu />
    <!-- TODO Show People at home -->
    <!-- TODO Show Date and Time -->
  </div>

  <div id="main">
    <NuxtLayout>
      <NuxtPage class="content-container" />
    </NuxtLayout>
  </div>

  <div id="footer">
    <nv-toast
      v-if="store.toastMessage != null"
      :type="store.toastType"
      :message="store.toastMessage"
    ></nv-toast>
  </div>
</template>

<script lang="ts" setup>
import { nvToast } from '@nevo/ui'
import {
  createConnection,
  createLongLivedTokenAuth,
  subscribeEntities
} from 'home-assistant-js-websocket'
import { onMounted } from 'vue'
import config from '../../config.json'
import { useInterceptor } from './axios/axios.interceptors'
import { useHomeAssistantStore } from './store/homeassistant'
import { useStore } from './store/index'
import { NevoConfig } from './types/nevoConfig'

const homeassistantStore = useHomeAssistantStore()
const store = useStore()

store.config = config as NevoConfig

const createHomeassistantWebsocketConnection = async () => {
  try {
    const auth = createLongLivedTokenAuth(
      config.homeassistant.hassUrl,
      config.homeassistant.life_time_token_raik
    )
    let connection = await createConnection({ auth })
    subscribeEntities(connection, (entities) => {
      homeassistantStore.haEntities = entities
    })
    homeassistantStore.haConnection = connection
  } catch (error) {
    console.log('error while connecting to home assistant')
  }
}

onMounted(async () => {
  await createHomeassistantWebsocketConnection()
})

useInterceptor()
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';
@import '@nevo/style/dark.scss';

$total-width: calc(#{$box-width} * 3 + #{$box-gap} * 2 + #{$box-gap} * 6);

html,
body {
  height: 100%;
  margin: 0;
}
@media (prefers-color-scheme: light) {
  body {
    // TODO default production background: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
    background: linear-gradient(to top, $nevo-primary-color 0%, $nevo-secondary-color 100%);
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background: black;
  }
}

#__nuxt {
  display: grid;
  grid-template-rows: 10% 85% 5%;
  height: 100%;
  place-items: center;
}
#header {
  width: $total-width;
  display: grid;
  padding: 0 1rem;
  align-items: center;
}
#main {
  display: grid;
  // grid-template-columns: auto auto;
  padding: 0 1rem;
  height: 100%;
  min-width: $total-width;
}
#footer {
  // background: black;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
