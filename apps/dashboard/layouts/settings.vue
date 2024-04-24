<template>
  <div class="settings-container">
    <div class="menu main-box menu-container">
      <div class="menu-link">
        <NuxtLink :to="{ path: '/settings/calendar' }"> Calendar </NuxtLink>
      </div>
      <div class="menu-link">
        <NuxtLink :to="{ path: '/settings/publicTransport' }"> Public Transport </NuxtLink>
      </div>
      <div class="menu-link">
        <NuxtLink :to="{ path: '/settings/plants' }"> Plants </NuxtLink>
      </div>
      <div class="menu-link">
        <NuxtLink :to="{ path: '/settings/locations' }"> Locations </NuxtLink>
      </div>
    </div>
    <div class="menu main-box settings-details">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
@import '@nevo/style/variables.scss';

.menu {
  border-radius: $standard-border-radius;
  padding: 15px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  background-color: $light-gray;
}

.settings-container {
  display: grid;
  width: 100%;
  grid-template-columns: 20% auto;
  gap: 1rem;
}

.settings-details {
  background-color: $light-gray;
  align-items: center;
}

.settings-detail-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .settings-detail-sub {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.menu-container > div {
  // border-bottom: 1px solid lightgray;
  padding-left: 15px;
  height: 4vh;
}

.menu-link {
  display: grid;
  align-content: center;
}

.menu-link:hover {
  background-color: $nevo-primary-color-light;
  border-radius: 10px;
  cursor: pointer;
}

// .menu-container > div:last-child {
//   border: none;
// }
.menu-link {
  a {
    color: black;
    text-decoration: none;
  }
}
</style>
