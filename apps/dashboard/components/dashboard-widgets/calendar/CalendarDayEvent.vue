<template>
  <div class="day-event-entry-wrapper">
    <div class="left-event-entry">
      <div class="calendar-color" :style="{ backgroundColor: event.calendarColor }"></div>
    </div>

    <div class="right-day-event-entry">
      <div class="event-summary" :style="{ color: event.calendarColor }">{{ event.summary }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Event } from '~~/types/googleCalendarResults'
const { event } = defineProps<{ event: Event }>()
</script>

<style lang="scss">
.day-event-entry-wrapper {
  width: 100%;
  margin-bottom: 2.5%;
}

.right-day-event-entry {
  height: 100%;
}

.event-summary {
  // TODO: opacity
}
</style>
