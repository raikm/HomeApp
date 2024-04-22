<template>
  <button class="glass-button">
    <slot></slot>
  </button>
</template>

<style lang="scss">
@import '@nevo/style/variables.scss';

.glass-button {
  height: 1.5rem;
  width: 1.5rem;
  background-color: transparent;
  border: none;
  font-size: larger;
  border-radius: 5px;
}

.glass-button:hover,
.glass-button:active {
  background-color: $light-gray;
}
</style>
