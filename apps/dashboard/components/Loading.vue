<template>
  <div class="ios-spinner">
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
    <div class="ios-spinner-blade"></div>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

$blade-count: 12;
$blade-delay: 80ms;
$blade-rotation-increment: 360deg / $blade-count;

.ios-spinner {
  display: flex;
  position: relative;
  font-size: 0.8rem;
  width: 1.75em;
  height: 1.75em;
  padding: 0.25em;
  color: rgba(0, 0, 0, 0.35);
}

.ios-spinner-blade {
  position: absolute;
  left: 50%;
  width: 0.125em;
  height: 0.3125em;
  margin-left: -0.0625em;
  background: currentColor;
  border-radius: 0.05em;
  transform-origin: 50% 0.625em;
  opacity: 0.2;
  animation: spinner-blade-opacity $blade-count * $blade-delay infinite;
}

@for $i from 1 through $blade-count {
  .ios-spinner-blade:nth-child(#{$i + 1}) {
    transform: rotateZ($blade-rotation-increment * $i);
    animation-delay: $blade-delay * $i;
  }
}

@keyframes spinner-blade-opacity {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.2;
  }
}
</style>
