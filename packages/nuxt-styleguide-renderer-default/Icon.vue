<template>
<Frame>
  <h1>{{name}}</h1>
  <img :src="iconUrl" />
</Frame>
</template>

<script>
import Frame from './frame';

export default {
  components: { Frame },
  props: {
    name: String,
    iconUrl: String,
    importPath: String,
  },
};</script>



<style>
</style>
