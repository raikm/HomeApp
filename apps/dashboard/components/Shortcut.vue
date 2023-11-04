<template>
  <div
    class="shortcut-pill bounce-button"
    :class="{ shake: animatedLoginButton }"
    @click="triggerShortcut"
  >
    <div class="shotcut-pill-text">⠕ {{ shortcut.attributes.friendly_name }}</div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { HassEntityBase } from 'home-assistant-js-websocket'
import { useStore } from '~~/store'

const props = defineProps<{
  shortcut: HassEntityBase
}>()
const store = useStore()

const animatedLoginButton = ref(false)

const config = {
  headers: {
    Authorization: `Bearer ${store.config.homeassistant.life_time_token_raik}`
  }
}

const triggerShortcut = async () => {
  var bodyParameters = {
    entity_id: props.shortcut.entity_id
  }

  await axios
    .post(
      `${store.config.homeassistant.hassUrl}/api/services/script/turn_on`,
      bodyParameters,
      config
    )
    .catch((error) => {
      console.error(error)
      showShakeAnimation()
    })
}

const showShakeAnimation = () => {
  animatedLoginButton.value = true
  setTimeout(() => {
    animatedLoginButton.value = false
  }, 1000)
}
</script>

<style lang="scss">
@import '@nevo/style/main.scss';

.shortcut-pill {
  margin: 1rem 1px;
  border-radius: 99px;
  height: 2rem;
  display: grid;
  justify-items: left;
  align-items: center;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  backdrop-filter: saturate(130%) blur(20px);
  cursor: pointer;
  min-width: 9rem;
}

@media (prefers-color-scheme: light) {
  .shortcut-pill {
    background-color: white;
  }
}

@media (prefers-color-scheme: dark) {
  .shortcut-pill {
    background-color: $black;
    color: $white;
  }
}

.shotcut-pill-text {
  white-space: nowrap;
}

.shake {
  animation: shake 0.3s;
}
@keyframes shake {
  10%,
  100% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  100% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-1px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(2px, 0, 0);
  }
}
</style>
