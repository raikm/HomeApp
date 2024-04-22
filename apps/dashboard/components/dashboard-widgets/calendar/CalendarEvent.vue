<template>
  <div class="event-entry">
    <div class="left-event-entry">
      <div class="calendar-color" :style="{ background: event.calendarColor }"></div>
    </div>

    <div class="right-event-entry">
      <div class="event-summary">{{ event.summary }}</div>

      <div class="event-time">
        {{
          new Date(event.start.dateTime).toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }}
        -
        {{
          new Date(event.end.dateTime).toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Event } from '~~/types/googleCalendarResults'
const { event } = defineProps<{ event: Event }>()
</script>

<style lang="scss">
.left-event-entry {
  float: left;
  width: 2%;
  height: 100%;
  margin-right: 3%;
}
.right-event-entry {
  font-size: medium;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr 1fr;
}
.calendar-color {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
.event-entry {
  width: 100%;
  margin-bottom: 2.5%;
}
.event-summary {
  font-size: medium;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: center;
}
.event-time {
  align-self: center;
}
</style>
