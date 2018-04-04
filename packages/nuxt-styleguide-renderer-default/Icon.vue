<template>
<div v-if="single" class="single-icon">
  <img :src="iconUrl" />
  {{name}}
</div>
<Frame v-else>
  <Backlink href="../"></Backlink>
  <h1>{{name}}</h1>
  <img :src="iconUrl" />
</Frame>
</template>

<script>
import Frame from './frame';
import Backlink from './component/backlink';

export default {
  components: { Frame, Backlink },
  props: {
    single: Boolean,
    name: String,
    iconUrl: String,
    importPath: String,
  },
};

</script>



<style>
.single-icon{
  display: flex;
  align-items: center;
}
.single-icon img{
  margin-right: .3em;
}
</style>
