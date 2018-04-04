<template>
<div v-if="single">
  <img :src="iconUrl" />
</div>
<Frame v-else>
  <h1>{{name}}</h1>
  <img :src="iconUrl" />
</Frame>
</template>

<script>
import Frame from './frame';

export default {
  components: { Frame },
  props: {
    single: Boolean,
    name: String,
    iconUrl: String,
    importPath: String,
  },
};

</script>



<style>
</style>
