<template>
  <div v-if="person.state === 'home'" class="person-circle">
    {{ person.attributes.friendly_name?.slice(0, 1).toUpperCase() }}
  </div>
</template>

<script lang="ts" setup>
import { HassEntity } from 'home-assistant-js-websocket'

defineProps<{ person: HassEntity }>()
</script>

<style lang="scss">
.person-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  backdrop-filter: saturate(130%) blur(20px);
  background-color: rgb(244, 244, 244);
  display: grid;
  place-items: center;
}
</style>
