<template>
  <Frame>
    <slot />
  </Frame>
</template>

<script>
import Frame from './frame';
export default {
  components: {
    Frame,
  },
};</script>
