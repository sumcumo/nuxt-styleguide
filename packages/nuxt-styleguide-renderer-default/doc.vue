<template>
  <Frame>
    <slot />
  </Frame>
</template>

<script>
import Frame from './frame';
import Backlink from './component/Backlink';
export default {
  components: {
    Frame,
    Backlink,
  },
};</script>
