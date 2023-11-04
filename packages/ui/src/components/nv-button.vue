<template>
  <button
    :class="{ 'hover-button': hoverable, 'standard-button': !hoverable, danger: type === 'danger' }"
    class="bounce-button"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  hoverable: { type: Boolean, required: false, default: false },
  type: { type: String, required: false, default: 'standard' }
})
</script>

<!-- TODO: class={"hoverable == true ? 'hover-button' : 'standard-button'"} -->
<style lang="scss">
@import '@nevo/style/variables.scss';

.standard-button {
  min-height: 2rem;
  display: grid;
  place-items: center;
  border-radius: 6px;
  border-style: none;
  background-color: white;
  padding: 5px 10px;
  font-weight: 550;
  font-size: 0.8rem;
  color: $nevo-primary-color-light;

  // for links ins buttons
  a {
    text-decoration: none;
    color: $nevo-primary-color-light;
  }
}

@media (prefers-color-scheme: light) {
  .standard-button {
    background-color: white;
  }
}

@media (prefers-color-scheme: dark) {
  .standard-button {
    background-color: black;
  }
}

.standard-button:hover {
  background-color: $nevo-secondary-color-light;
  cursor: pointer;
}

button:focus,
button:focus-visible {
  outline: 0px auto -webkit-focus-ring-color;
}

.hover-button {
  background-color: rgba(255, 255, 255, 0.5);
  height: 3vh;
  width: 3vh;
  display: grid;
  place-items: center;
  border-width: 0;
  border-style: solid;
  border-radius: 5px;
  overflow: hidden;
}

.hover-button:hover {
  background-color: rgb(255, 255, 255);
  cursor: none;
  // TODO ZOOM
}

.danger {
  color: $red;
}

@media (prefers-color-scheme: light) {
  .standard-button {
    background-color: rgb(244, 244, 242);
  }
}
</style>
