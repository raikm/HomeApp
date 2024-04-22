<template>
  <component id="clear" v-if="weather.main === 'Clear' && sunset === false" :is="Clear"></component>
  <component
    id="clear-night"
    v-if="weather.main === 'Clear' && sunset === true"
    :is="Moon"
  ></component>
  <component id="clouds" v-if="weather.main === 'Clouds'" :is="Clouds"></component>
  <component id="rain" v-if="weather.main === 'Rain'" :is="Rain"></component>
  <component
    id="thunderstorm"
    v-if="weather.main === 'Thunderstorm'"
    :is="Thunderstorm"
  ></component>
  <component id="drizzle" v-if="weather.main === 'Drizzle'" :is="Drizzle"></component>
  <component id="snow" v-if="weather.main === 'Snow'" :is="Snow"></component>
</template>

<script lang="ts" setup>
import Clear from '~/assets/icons/weather/weather_clear.svg?component'
import Clouds from '~/assets/icons/weather/weather_clouds.svg?component'
import Drizzle from '~/assets/icons/weather/weather_mist.svg?component'
import Moon from '~/assets/icons/weather/weather_moon.svg?component'
import Rain from '~/assets/icons/weather/weather_rain.svg?component'
import Snow from '~/assets/icons/weather/weather_snow.svg?component'
import Thunderstorm from '~/assets/icons/weather/weather_thunderstorm.svg?component'
import { Weather } from '../../../types/weatherForecast'

defineProps<{ weather: Weather; sunset: boolean }>()
</script>

<style lang="scss">
#clouds,
#clear-night,
#drizzle,
#snow,
#rain {
  fill: white;
}
</style>
