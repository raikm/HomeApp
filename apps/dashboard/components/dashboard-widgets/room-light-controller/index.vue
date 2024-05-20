<template>
  <Transition>
    <div v-if="store.homerooms && store.homerooms.length > 0" class="room-light-controller-wrapper">
      <div class="room-light-controller">
        <div
          class="roomlight-button bounce-button"
          :class="room.state == 'on' ? 'roomlight-button-on' : 'roomlight-button-off'"
          :key="room.entity_id"
          v-for="room in store.homerooms"
          @click="triggerGroupState(room.entity_id, room.state)"
        >
          <div class="bulb-icon-and-warning-wrapper">
            <div class="bulb-icon-wrapper">
              <svg
                width="376"
                height="438"
                viewBox="0 0 376 438"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M193.352 344.104C212.336 345.916 233.227 346.604 248.04 346.604C262.868 346.604 283.743 345.916 302.727 344.104L293.602 400.745C293.133 404.729 291.196 408.416 288.133 411.198L279.618 418.932C279.055 419.448 278.508 420.01 278.024 420.604L269.04 431.245C265.555 435.354 260.274 437.745 254.711 437.745H248.04H241.383C235.805 437.745 230.524 435.354 227.055 431.245L218.071 420.604C217.571 420.01 217.04 419.448 216.461 418.932L207.961 411.198C204.883 408.416 202.961 404.729 202.477 400.745L193.352 344.104ZM193.352 344.104C212.336 345.916 233.227 346.604 248.04 346.604C262.868 346.604 283.743 345.916 302.727 344.104L293.602 400.745C293.133 404.729 291.196 408.416 288.133 411.198L279.618 418.932C279.055 419.448 278.508 420.01 278.024 420.604L269.04 431.245C265.555 435.354 260.274 437.745 254.711 437.745H248.04H241.383C235.805 437.745 230.524 435.354 227.055 431.245L218.071 420.604C217.571 420.01 217.04 419.448 216.461 418.932L207.961 411.198C204.883 408.416 202.961 404.729 202.477 400.745L193.352 344.104ZM193.352 344.104C212.336 345.916 233.227 346.604 248.04 346.604C262.868 346.604 283.743 345.916 302.727 344.104L293.602 400.745C293.133 404.729 291.196 408.416 288.133 411.198L279.618 418.932C279.055 419.448 278.508 420.01 278.024 420.604M193.352 344.104C212.336 345.916 233.227 346.604 248.04 346.604C262.868 346.604 283.743 345.916 302.727 344.104L293.602 400.745C293.133 404.729 291.196 408.416 288.133 411.198L279.618 418.932C279.055 419.448 278.508 420.01 278.024 420.604L269.04 431.245C265.555 435.354 260.274 437.745 254.711 437.745H248.04H241.383M193.352 344.104C212.336 345.916 233.227 346.604 248.04 346.604C262.868 346.604 283.743 345.916 302.727 344.104L293.602 400.745C293.133 404.729 291.196 408.416 288.133 411.198L279.618 418.932C279.055 419.448 278.508 420.01 278.024 420.604L269.04 431.245C265.555 435.354 260.274 437.745 254.711 437.745M193.352 344.104C212.336 345.916 233.227 346.604 248.04 346.604C262.868 346.604 283.743 345.916 302.727 344.104L293.602 400.745C293.133 404.729 291.196 408.416 288.133 411.198L279.618 418.932C279.055 419.448 278.508 420.01 278.024 420.604L269.04 431.245C265.555 435.354 260.274 437.745 254.711 437.745H248.04H241.383C235.805 437.745 230.524 435.354 227.055 431.245"
                  fill="#D7D7D7"
                />
                <path
                  d="M91.6442 312.654C80.5974 312.654 65.0817 312.154 50.9567 310.794L57.7224 347.716C58.0661 350.685 59.5036 353.435 61.7692 355.498L68.113 361.248C68.5349 361.638 68.9255 362.045 69.3161 362.498L76.0036 370.404C78.5817 373.466 82.5036 375.248 86.6442 375.248H91.613H96.5661C100.722 375.248 104.644 373.466 107.222 370.404L113.894 362.498C114.269 362.045 114.675 361.638 115.097 361.248L121.441 355.498C123.691 353.435 125.144 350.685 125.504 347.716L132.316 310.794C118.207 312.154 102.675 312.654 91.6442 312.654Z"
                  fill="#D7D7D7"
                />

                <Transition name="bulb-fade">
                  <path
                    v-if="room.state === 'on'"
                    d="M356.8 115.199C365.3 98.3867 390.597 51.3086 362.8 25.7304C333.097 -1.5977 252.988 0.277299 247.957 0.277299C242.957 0.277299 162.847 -1.5977 133.129 25.7304C105.316 51.3086 130.644 98.3867 139.144 115.199C162.019 121.855 198.66 127.855 247.957 127.855C297.285 127.855 333.91 121.855 356.8 115.199Z"
                    fill="#F4BD4B"
                  />
                  <path
                    v-else
                    d="M356.8 115.199C365.3 98.3867 390.597 51.3086 362.8 25.7304C333.097 -1.5977 252.988 0.277299 247.957 0.277299C242.957 0.277299 162.847 -1.5977 133.129 25.7304C105.316 51.3086 130.644 98.3867 139.144 115.199C162.019 121.855 198.66 127.855 247.957 127.855C297.285 127.855 333.91 121.855 356.8 115.199Z"
                    fill="#ebe8e8"
                  />
                </Transition>

                <path
                  d="M348.885 135.998C316.213 143.482 275.729 146.076 247.963 146.076C220.213 146.076 179.729 143.482 147.057 135.998C171.807 212.904 176.026 283.263 175.197 303.295C174.994 307.904 176.588 312.326 179.619 315.826L187.666 325.029C204.994 327.076 225.088 328.373 247.963 328.373C270.838 328.373 290.947 327.076 308.26 325.029L316.307 315.826C319.354 312.326 320.932 307.904 320.744 303.295C319.901 283.263 324.135 212.904 348.885 135.998Z"
                  fill="#D7D7D7"
                />
                <Transition name="bulb-fade">
                  <path
                    v-if="room.state === 'on'"
                    d="M91.5989 156.499C108.615 156.499 123.49 155.468 136.193 153.843C134.927 149.515 133.583 145.155 132.177 140.796C128.146 129.812 124.333 120.562 124.333 120.562C118.568 107.53 106.99 86.343 105.083 62.9523C97.7708 62.6711 92.5833 62.7648 91.5989 62.7648C88.0052 62.7648 30.7864 61.3898 9.56767 81.468C-10.2917 100.249 7.77079 134.843 13.8489 147.187C30.1927 152.109 56.3802 156.499 91.5989 156.499Z"
                    fill="#F4BD4B"
                  />
                  <path
                    v-else
                    d="M91.5989 156.499C108.615 156.499 123.49 155.468 136.193 153.843C134.927 149.515 133.583 145.155 132.177 140.796C128.146 129.812 124.333 120.562 124.333 120.562C118.568 107.53 106.99 86.343 105.083 62.9523C97.7708 62.6711 92.5833 62.7648 91.5989 62.7648C88.0052 62.7648 30.7864 61.3898 9.56767 81.468C-10.2917 100.249 7.77079 134.843 13.8489 147.187C30.1927 152.109 56.3802 156.499 91.5989 156.499Z"
                    fill="#ebe8e8"
                  />
                </Transition>
                <path
                  d="M149.547 208.943C147.032 196.021 143.985 182.459 140.297 168.537C123.016 170.88 105.11 171.849 91.5942 171.849C72.5161 171.849 44.688 170.068 22.2349 164.943C39.2505 217.771 42.1567 266.115 41.5786 279.88C41.4536 283.068 42.5317 286.084 44.6255 288.505L50.1411 294.818C62.0474 296.224 75.8755 297.115 91.5942 297.115C107.313 297.115 121.11 296.224 133.032 294.818L138.563 288.505C140.641 286.084 141.735 283.068 141.594 279.88C141.188 270.115 142.641 242.802 149.547 208.943Z"
                  fill="#D7D7D7"
                />
              </svg>
            </div>
            <div v-if="room.state === 'unavailable'" class="warning-wrapper">
              <span>!</span>
            </div>
          </div>
          <div class="room-name">{{ room.attributes.friendly_name }}</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { useHomeAssistantStore } from '~~/store/homeassistant'

const store = useHomeAssistantStore()

const triggerGroupState = (entity_id: string, state: string) => {
  if (state === 'unavailable') return
  let service = state == 'on' ? 'turn_off' : 'turn_on'
  let domain = entity_id?.split('.')[0]
  store.haConnection?.sendMessagePromise({
    type: 'call_service',
    domain: domain,
    service: service,
    service_data: {
      entity_id: entity_id
    }
  })
}
</script>

<style lang="scss">
@import '@nevo/style/variables.scss';

.room-light-controller {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  column-gap: 1rem;
  grid-auto-columns: minmax(110px, 1fr);
  grid-auto-flow: column;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  align-content: flex-end;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}

.room-light-controller::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.roomlight-button {
  height: 5rem;
  width: 7rem;
  border-radius: 12px;
  margin: 0.3rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 0.6rem;
  border: solid 1px rgba(222, 222, 222, 0.176);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);

  transition: all 0.3s ease 0s;
  cursor: pointer;
}
@media (prefers-color-scheme: light) {
  .roomlight-button-on {
    background-color: white;
  }
}

@media (prefers-color-scheme: dark) {
  .roomlight-button-on {
    background-color: black;
    color: $white;
  }
}

.roomlight-button-off {
  background-color: rgba(236, 236, 236, 0.1);
}

.bulb-icon-and-warning-wrapper {
  display: grid;
  grid-template-columns: 0.6fr 2fr;
  position: relative;
  width: 100%;
}

.warning-wrapper {
  color: $yellow;
  font-weight: bold;
  font-size: small;

  display: grid;
  place-items: end start;
  height: 65%;
}

.room-name {
  font-size: small;
}
.bulb-icon-wrapper {
  overflow: hidden;
}

.bulb-icon-wrapper > svg {
  width: 100%;
  height: 65%;
}

.bulb-fade-enter-active,
.bulb-fade-leave-active {
  transition: opacity 0.5s ease;
}

.bulb-fade-enter-from,
.bulb-fade-leave-to {
  opacity: 0;
}
</style>
