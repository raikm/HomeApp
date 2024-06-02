<template>
  <div class="max-w-screen-lg" id="menu-main-wrapper">
    <div id="menu-main">
      <div id="menu-pills">
        <div
          @click="changePage('index', 0)"
          class="menu-button-new bounce-button"
          :class="{ activeMenu: activeIndex === 0 }"
        >
          <div class="text-center">Dashboard</div>
        </div>

        <div
          @click="changePage('plants', 2)"
          class="menu-button-new bounce-button"
          :class="{ activeMenu: activeIndex === 2 }"
        >
          <div class="text-center">Plants</div>
        </div>
        <div
          @click="changePage('settings', 3)"
          class="menu-button-new bounce-button"
          :class="{ activeMenu: activeIndex === 3 }"
        >
          <div class="text-center">Settings</div>
        </div>
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
    border-radius: 12px;
    height: 2rem;
    display: grid;
    font-weight: 600;
    place-items: center;
    font-size: 0.8rem;

    cursor: pointer;
  }

  .menu-button-new {
    width: 8rem;
    // background-color: $light-gray;
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
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
    // fill: rgba(0, 0, 0, 0.479);
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
