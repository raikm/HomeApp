<template>
  <div id="menu-main-wrapper">
    <!-- <div id="menu-main">
    <Transition name="slide-fade">
        <div v-if="!showMenu" class="menu-trigger menu-open bounce-button" @click="showMenu = true">
          <div>◌</div>
        </div>
      </Transition>
      <Transition name="slide-fade">
        <div v-if="showMenu" id="menu-pills">
          <div
            @click="changePage('index', 0)"
            class="menu-button-new bounce-button"
            :class="{ activeMenu: activeIndex === 0 }"
          >
            <div class="menu-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="512"
                height="512"
              >
                <path d="M15,0H3A3,3,0,0,0,0,3v8H15V0Z" />
                <path d="M21,0H17V11h7V3a3,3,0,0,0-3-3Z" />
                <path d="M7,13H0v8a3,3,0,0,0,3,3H7V13Z" />
                <path d="M24,13H9V24H21a3,3,0,0,0,3-3V13Z" />
              </svg>
            </div>
            <div class="menu-text">Dashboard</div>
          </div>
          <div
            @click="changePage('rooms', 1)"
            class="menu-button-new bounce-button"
            :class="{ activeMenu: activeIndex === 1 }"
          >
            <div class="menu-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="512"
                height="512"
              >
                <path
                  d="M14.762,11.587A5.5,5.5,0,0,1,13,12.223V23.874a4.922,4.922,0,0,0,1.5-.557l6.027-3.479a5.016,5.016,0,0,0,2.5-4.331V8.547a4.959,4.959,0,0,0-.265-1.57Z"
                />
                <path
                  d="M10.242,9.857a3.531,3.531,0,0,0,3.521,0l8-4.61a4.983,4.983,0,0,0-1.238-1.027L14.5.737a5.015,5.015,0,0,0-5,0L3.473,4.217a4.974,4.974,0,0,0-1.2.983Z"
                />
                <path
                  d="M11,12.223a5.493,5.493,0,0,1-1.763-.636L1.257,6.923A4.956,4.956,0,0,0,.973,8.547v6.96a5.016,5.016,0,0,0,2.5,4.331L9.5,23.317a4.922,4.922,0,0,0,1.5.557Z"
                />
              </svg>
            </div>
            <div class="menu-text">Rooms</div>
          </div>
          <div
            @click="changePage('plants', 2)"
            class="menu-button-new bounce-button"
            :class="{ activeMenu: activeIndex === 2 }"
          >
            <div class="menu-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="512"
                height="512"
              >
                <path
                  d="M23.263,14.759a2.427,2.427,0,0,0-2-.748A12.49,12.49,0,0,0,13.5,17.337V14.818a6.506,6.506,0,0,0,5-6.318c0-2.973-2.016-5.43-3.987-7.441a3.592,3.592,0,0,0-5.026,0C7.516,3.07,5.5,5.527,5.5,8.5a6.506,6.506,0,0,0,5,6.318v2.519a12.493,12.493,0,0,0-7.763-3.326,2.432,2.432,0,0,0-2,.748,2.665,2.665,0,0,0-.687,2.2c.811,5.673,6.6,7.108,10.559,7.108,5.012.143,12.1-.157,13.341-7.108A2.669,2.669,0,0,0,23.263,14.759ZM8.5,8.5a7.04,7.04,0,0,1,2-4.118V7.5a1.5,1.5,0,0,0,3,0V4.382a7.04,7.04,0,0,1,2,4.118,3.5,3.5,0,0,1-7,0ZM3.127,17.077a8.953,8.953,0,0,1,6.561,3.956C7.369,20.9,3.917,20.162,3.127,17.077Zm11.185,3.956a8.955,8.955,0,0,1,6.561-3.956C20.084,20.162,16.631,20.9,14.312,21.033Z"
                />
              </svg>
            </div>
            <div class="menu-text">Plants</div>
          </div>
          <div class="menu-trigger menu-close bounce-button" @click="showMenu = false">
            <div>✕</div>
          </div>
        </div>
      </Transition>
    </div> -->
    <!-- v-slot for persons -->
    <div id="settings">
      <div
        class="settings-wrapper bounce-button"
        :class="{ activeMenu: activeIndex === 100 }"
        @click="changePage('settings', 100)"
      >
        <svg
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="90px"
          height="90px"
        >
          <path
            d="M 15 2 C 14.448 2 14 2.448 14 3 L 14 3.171875 C 14 3.649875 13.663406 4.0763437 13.191406 4.1523438 C 12.962406 4.1893437 12.735719 4.2322031 12.511719 4.2832031 C 12.047719 4.3892031 11.578484 4.1265 11.396484 3.6875 L 11.330078 3.53125 C 11.119078 3.02125 10.534437 2.7782344 10.023438 2.9902344 C 9.5134375 3.2012344 9.2704219 3.785875 9.4824219 4.296875 L 9.5488281 4.4570312 C 9.7328281 4.8970313 9.5856875 5.4179219 9.1796875 5.6699219 C 8.9836875 5.7919219 8.7924688 5.9197344 8.6054688 6.0527344 C 8.2174688 6.3297344 7.68075 6.2666875 7.34375 5.9296875 L 7.2226562 5.8085938 C 6.8316562 5.4175937 6.1985937 5.4175938 5.8085938 5.8085938 C 5.4185938 6.1995938 5.4185938 6.8326563 5.8085938 7.2226562 L 5.9296875 7.34375 C 6.2666875 7.68075 6.3297344 8.2164688 6.0527344 8.6054688 C 5.9197344 8.7924687 5.7919219 8.9836875 5.6699219 9.1796875 C 5.4179219 9.5856875 4.8960781 9.7337812 4.4550781 9.5507812 L 4.296875 9.484375 C 3.786875 9.273375 3.2002813 9.5153906 2.9882812 10.025391 C 2.7772813 10.535391 3.0192969 11.120031 3.5292969 11.332031 L 3.6855469 11.396484 C 4.1245469 11.578484 4.3892031 12.047719 4.2832031 12.511719 C 4.2322031 12.735719 4.1873906 12.962406 4.1503906 13.191406 C 4.0753906 13.662406 3.649875 14 3.171875 14 L 3 14 C 2.448 14 2 14.448 2 15 C 2 15.552 2.448 16 3 16 L 3.171875 16 C 3.649875 16 4.0763437 16.336594 4.1523438 16.808594 C 4.1893437 17.037594 4.2322031 17.264281 4.2832031 17.488281 C 4.3892031 17.952281 4.1265 18.421516 3.6875 18.603516 L 3.53125 18.669922 C 3.02125 18.880922 2.7782344 19.465563 2.9902344 19.976562 C 3.2012344 20.486563 3.785875 20.729578 4.296875 20.517578 L 4.4570312 20.451172 C 4.8980312 20.268172 5.418875 20.415312 5.671875 20.820312 C 5.793875 21.016313 5.9206875 21.208484 6.0546875 21.396484 C 6.3316875 21.784484 6.2686406 22.321203 5.9316406 22.658203 L 5.8085938 22.779297 C 5.4175937 23.170297 5.4175938 23.803359 5.8085938 24.193359 C 6.1995938 24.583359 6.8326562 24.584359 7.2226562 24.193359 L 7.3457031 24.072266 C 7.6827031 23.735266 8.2174688 23.670266 8.6054688 23.947266 C 8.7934688 24.081266 8.9856406 24.210031 9.1816406 24.332031 C 9.5866406 24.584031 9.7357344 25.105875 9.5527344 25.546875 L 9.4863281 25.705078 C 9.2753281 26.215078 9.5173438 26.801672 10.027344 27.013672 C 10.537344 27.224672 11.121984 26.982656 11.333984 26.472656 L 11.398438 26.316406 C 11.580438 25.877406 12.049672 25.61275 12.513672 25.71875 C 12.737672 25.76975 12.964359 25.814562 13.193359 25.851562 C 13.662359 25.924562 14 26.350125 14 26.828125 L 14 27 C 14 27.552 14.448 28 15 28 C 15.552 28 16 27.552 16 27 L 16 26.828125 C 16 26.350125 16.336594 25.923656 16.808594 25.847656 C 17.037594 25.810656 17.264281 25.767797 17.488281 25.716797 C 17.952281 25.610797 18.421516 25.8735 18.603516 26.3125 L 18.669922 26.46875 C 18.880922 26.97875 19.465563 27.221766 19.976562 27.009766 C 20.486563 26.798766 20.729578 26.214125 20.517578 25.703125 L 20.451172 25.542969 C 20.268172 25.101969 20.415312 24.581125 20.820312 24.328125 C 21.016313 24.206125 21.208484 24.079312 21.396484 23.945312 C 21.784484 23.668312 22.321203 23.731359 22.658203 24.068359 L 22.779297 24.191406 C 23.170297 24.582406 23.803359 24.582406 24.193359 24.191406 C 24.583359 23.800406 24.584359 23.167344 24.193359 22.777344 L 24.072266 22.654297 C 23.735266 22.317297 23.670266 21.782531 23.947266 21.394531 C 24.081266 21.206531 24.210031 21.014359 24.332031 20.818359 C 24.584031 20.413359 25.105875 20.264266 25.546875 20.447266 L 25.705078 20.513672 C 26.215078 20.724672 26.801672 20.482656 27.013672 19.972656 C 27.224672 19.462656 26.982656 18.878016 26.472656 18.666016 L 26.316406 18.601562 C 25.877406 18.419563 25.61275 17.950328 25.71875 17.486328 C 25.76975 17.262328 25.814562 17.035641 25.851562 16.806641 C 25.924562 16.337641 26.350125 16 26.828125 16 L 27 16 C 27.552 16 28 15.552 28 15 C 28 14.448 27.552 14 27 14 L 26.828125 14 C 26.350125 14 25.923656 13.663406 25.847656 13.191406 C 25.810656 12.962406 25.767797 12.735719 25.716797 12.511719 C 25.610797 12.047719 25.8735 11.578484 26.3125 11.396484 L 26.46875 11.330078 C 26.97875 11.119078 27.221766 10.534437 27.009766 10.023438 C 26.798766 9.5134375 26.214125 9.2704219 25.703125 9.4824219 L 25.542969 9.5488281 C 25.101969 9.7318281 24.581125 9.5846875 24.328125 9.1796875 C 24.206125 8.9836875 24.079312 8.7915156 23.945312 8.6035156 C 23.668312 8.2155156 23.731359 7.6787969 24.068359 7.3417969 L 24.191406 7.2207031 C 24.582406 6.8297031 24.582406 6.1966406 24.191406 5.8066406 C 23.800406 5.4156406 23.167344 5.4156406 22.777344 5.8066406 L 22.65625 5.9296875 C 22.31925 6.2666875 21.782531 6.3316875 21.394531 6.0546875 C 21.206531 5.9206875 21.014359 5.7919219 20.818359 5.6699219 C 20.413359 5.4179219 20.266219 4.8960781 20.449219 4.4550781 L 20.515625 4.296875 C 20.726625 3.786875 20.484609 3.2002812 19.974609 2.9882812 C 19.464609 2.7772813 18.879969 3.0192969 18.667969 3.5292969 L 18.601562 3.6855469 C 18.419563 4.1245469 17.950328 4.3892031 17.486328 4.2832031 C 17.262328 4.2322031 17.035641 4.1873906 16.806641 4.1503906 C 16.336641 4.0753906 16 3.649875 16 3.171875 L 16 3 C 16 2.448 15.552 2 15 2 z M 15 7 C 19.078645 7 22.438586 10.054876 22.931641 14 L 16.728516 14 A 2 2 0 0 0 15 13 A 2 2 0 0 0 14.998047 13 L 11.896484 7.625 C 12.850999 7.222729 13.899211 7 15 7 z M 10.169922 8.6328125 L 13.269531 14 A 2 2 0 0 0 13 15 A 2 2 0 0 0 13.269531 15.996094 L 10.167969 21.365234 C 8.2464258 19.903996 7 17.600071 7 15 C 7 12.398945 8.2471371 10.093961 10.169922 8.6328125 z M 16.730469 16 L 22.931641 16 C 22.438586 19.945124 19.078645 23 15 23 C 13.899211 23 12.850999 22.777271 11.896484 22.375 L 14.998047 17 A 2 2 0 0 0 15 17 A 2 2 0 0 0 16.730469 16 z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref(0)
const showMenu = ref(false)

const changePage = async (name: string, index: number) => {
  activeIndex.value = index
  await navigateTo({
    name: name
  })
}
</script>

<style lang="scss">
@import '@nevo/style//main.scss';
@import '@nevo/style/variables.scss';

#menu-main-wrapper {
  display: grid;
  grid-template-columns: auto 20%;
  align-items: center;
  position: relative;
  #menu-main {
    height: 100%;
  }

  #menu-pills {
    display: flex;
    column-gap: $standard-space;
    position: absolute;
    z-index: 3;
  }

  .menu-open {
    position: absolute;
    z-index: 1;
  }

  .menu-icon-wrapper > svg {
    height: 0.8rem;
    width: 0.8rem;
  }
  .menu-icon-wrapper {
    display: grid;
    justify-self: right;
  }
  .menu-text {
    justify-self: left;
    padding-left: 0.8rem;
  }

  .menu-trigger {
    width: 2rem;
  }

  .menu-trigger:hover {
    background-color: white;
  }

  .menu-trigger > div {
    font-size: medium;
  }

  .menu-close {
    background-color: $light-gray;
  }

  .menu-close:hover {
    background-color: white;
  }

  .menu-close > span {
    transform: rotate(180deg);
    margin-left: -3px;
  }
  .menu-trigger,
  .menu-button-new {
    border-radius: 99px;
    height: 2rem;
    display: grid;
    grid-template-columns: 2rem auto;

    place-items: center;
    font-size: 0.8rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    backdrop-filter: saturate(130%) blur(20px);

    cursor: pointer;
  }

  .menu-button-new {
    width: 8rem;
    background-color: $light-gray;
  }

  .menu-button-new:hover {
    background-color: white;
  }

  #settings {
    display: grid;
  }
  #people {
    display: inline-flex;
    column-gap: calc($standard-space / 3);
    justify-self: right;
  }

  .settings-wrapper {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    backdrop-filter: saturate(130%) blur(20px);
    background-color: $light-gray;
    border-radius: 50%;
    width: 2rem;
    display: grid;
    justify-items: center;
    align-items: center;
    justify-self: right;
  }
  .settings-wrapper > svg {
    padding: 0.2rem;
    height: 1.6rem;
    width: 1.6rem;
    fill: rgba(0, 0, 0, 0.479);
  }
  .settings-wrapper:hover {
    background-color: white;
    cursor: pointer;
  }
}

#menu-pills::-webkit-scrollbar {
  display: none;
}

@media (prefers-color-scheme: light) {
  .activeMenu,
  .menu-open {
    background-color: white !important;
  }
}

@media (prefers-color-scheme: dark) {
  .activeMenu,
  .menu-open {
    background-color: $black !important;
    color: white;
  }
}

$inactive-color: $gray;

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

// .slide-fade-leave-active {
//   transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
// }

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
