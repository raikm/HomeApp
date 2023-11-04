<template>
  <Transition>
    <DayForecast
      v-if="weatherForecast && Object.keys(weatherForecast).length !== 0"
      :style="{ backgroundImage: backgroundImage }"
      class="forecast"
      :sunset="sunset"
      :weatherForecast="weatherForecast"
    />
  </Transition>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from '~~/store'
import { WeatherForecast } from '../../../types/weatherForecast'
import DayForecast from './DayForecast.vue'

const store = useStore()
let refreshInterval: NodeJS.Timer
const sunset = ref<boolean>()

onMounted(async () => {
  await getWeatherForecastDataFromAPI()
  refreshInterval = setInterval(async () => {
    await getWeatherForecastDataFromAPI()
  }, 600000) // every 10 minutes
})

onBeforeUnmount(() => {
  clearInterval(refreshInterval)
})

const weatherForecast = ref<WeatherForecast>()
const backgroundImage = ref('linear-gradient(-150deg, #7de2fc 0%, #b6bee5 100%)')

const getWeatherForecastDataFromAPI = async () => {
  const config = store.config
  const { api_key, open_weather_url } = config.weather
  const response = await axios.get(`${open_weather_url}&appid=${api_key}`, {})
  weatherForecast.value = response.data
  defineBackground()
}

const defineBackground = () => {
  if (weatherForecast.value == null) return
  const sunsetTime = new Date(weatherForecast.value.daily[0].sunset * 1000)
  const sunsetInMinutes = sunsetTime.getHours() * 60 + sunsetTime.getMinutes()
  const now = new Date()
  const nowInMinutes = now.getHours() * 60 + now.getMinutes()

  // Darkmode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    backgroundImage.value = 'linear-gradient(-150deg, #045d73 0%, #676b82 100%)'
  }
  // DAY
  else if (sunsetInMinutes > nowInMinutes) {
    sunset.value = false
    switch (weatherForecast.value.current.weather[0].main) {
      case 'Snow':
        backgroundImage.value = 'linear-gradient(-150deg, #045d73 0%, #676b82 100%)'
        break
      case 'Rain':
        backgroundImage.value = 'linear-gradient(-150deg, #045d73 0%, #676b82 100%)'
        break
      default:
        backgroundImage.value = 'linear-gradient(-150deg, #5ea5c9 100%, #2374bb 0%)'
        break
    }
  }
  // NIGHT
  else {
    sunset.value = true
    backgroundImage.value = 'linear-gradient(-150deg, #045d73 0%, #676b82 100%)'
  }
}
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';
.forecast {
  height: 100%;
}
#weather-header {
  // background-color: chartreuse;
  height: 20%;
  display: grid;
  color: white;
  grid-template-columns: 4fr 1fr;
  #weather-icon {
    height: 100%;
    justify-self: right;
  }
}
#temperature-info-overview {
  // background-color: red;
  height: 40%;
  display: grid;
  color: white;
  grid-template-columns: 2fr 4fr;
  #temperature-outdoor-info {
    font-size: $standard-text-big;
  }
  #weather-description {
    text-align: right;
    font-size: $standard-text-small;
    display: grid;
    grid-template-rows: 0.5fr 1fr;
  }
}
#temperature-hour-info {
  // background-color: blue;
  height: 40%;
  display: grid;
  color: white;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 15px;
  .temperature-hour-content {
    // text-align: center;
    display: grid;
    grid-template-rows: 13px 25px 13px;
    // justify-items: center;
    align-items: center;
    .weather-hour {
      font-size: $standard-text-small;
      opacity: 80%;
      justify-self: center;
    }
    .weather-icon-wrapper {
      width: 100%;
      height: 100%;
    }
    .weather-hour-icon {
      fill: white;
    }
    .weather-hour-temperature {
      font-size: $standard-text-small;
      font-weight: 700;
      justify-self: center;
    }
  }
}
</style>
