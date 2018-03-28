<template>
  <Frame>
    <Backlink :href="$styleguide.path"></Backlink>
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
