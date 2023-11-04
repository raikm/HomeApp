<template>
  <Transition>
    <div v-if="error.length != 0">
      <div id="calendar-header">
        <div id="calendar-info" v-if="calendarTitle">
          <div id="calendar-day-info">{{ calendarTitle.title }}</div>
          <div id="calendar-month-info">, {{ calendarTitle.dateMonth }}</div>
        </div>
      </div>
      <div class="calendar-body-wrapper" v-if="!loading">
        <div v-if="error != undefined" class="calendar-body service-info">
          Service is not available
          <nv-button>
            <NuxtLink :to="{ path: '/settings/calendar' }">Go to Settings</NuxtLink>
          </nv-button>
        </div>

        <div
          v-else-if="calendarEvents.length === 0 && calendarDayEvents.length === 0"
          class="calendar-body no-events-info"
        >
          <div>⛰️ No events today</div>
        </div>

        <div v-else class="calendar-body">
          <div class="calendar-events">
            <div v-if="calendarDayEvents.length > 0" class="calendar-day-events">
              <CalendarDayEvent
                v-for="calendarDayEvent in calendarDayEvents"
                :event="calendarDayEvent"
              />
            </div>
            <div class="calendar-next-events">
              <CalendarEvent
                v-for="event in calendarEvents.slice(0, 3)"
                :key="event.id"
                :event="event"
              />
              <div v-if="calendarEvents.length > 3" class="preview-calendar-event">
                <div
                  class="calendar-color-bar"
                  :key="event.id"
                  v-for="event in calendarEvents.slice(3, 6)"
                  :style="{ background: event.calendarColor }"
                ></div>
                <div class="preview-text">{{ calendarEvents.length - 3 }} more events</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loading v-else />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { nvButton } from '@nevo/ui'
import axios from 'axios'
import { useCalendarService } from '~~/services/calendar'
import { Event } from '~~/types/googleCalendarResults'
import CalendarDayEvent from './CalendarDayEvent.vue'
import CalendarEvent from './CalendarEvent.vue'
const { isReady } = useCodeClient()

const calendarService = useCalendarService()
const calendarEvents = ref<Event[]>([])
const calendarDayEvents = ref<Event[]>([])
const loading = ref(false)
const error = ref<string>('')

onMounted(async () => {
  refreshCalendars()
})

const refreshCalendars = async () => {
  loading.value = true

  if (isReady) {
    try {
      const allEvents = await calendarService.getTodayGoogleCalendarEvents()
      calendarDayEvents.value = allEvents.filter((e) => e.start.date)
      calendarEvents.value = allEvents
        .filter((e) => e.start.dateTime)
        .sort((a, b) => Date.parse(a.start.dateTime) - Date.parse(b.start.dateTime))
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
      }
      error.value = err
    }
  }

  loading.value = false
}

const calendarTitle = computed(() => {
  let now = new Date()
  let dateMonth = now.getUTCDate() + '. ' + now.toLocaleString('default', { month: 'long' })
  return {
    title: now.toLocaleDateString('en-US', {
      weekday: 'long'
    }),
    dateMonth: dateMonth
  }
})
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';

.calendar-body-wrapper {
  height: 85%;
  display: grid;
  place-items: center;
}

#calendar-header {
  height: 15%;
  #calendar-day-info {
    color: $red;
    font-weight: bold;
  }
  #calendar-info {
    display: flex;
    font-size: medium;
  }
}
.calendar-body {
  height: 85%;
  width: 100%;
}
.calendar-events {
  height: 100%;
  display: grid;
  grid-template-columns: 47.5% 47.5%;
  gap: 5%;
  .calendar-next-events {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
.preview-calendar-event {
  display: flex;
  width: 100%;
  height: 1rem;
}
.preview-text {
  font-size: small;
  margin-left: 0.5vh;
  display: flex;
  height: 1rem;
}
.calendar-color-bar {
  width: 3px;
  border-radius: 20px;
  height: 100%;
  margin-right: 2px;
}

.calendar-day-events {
  display: flex;
  flex-direction: column;
}

.no-events-info {
  font-size: large;
  display: grid;
  place-items: center;
}
</style>
