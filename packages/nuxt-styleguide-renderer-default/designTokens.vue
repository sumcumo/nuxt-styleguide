<template>
<Frame>

  <Backlink :href="$styleguide.path"></Backlink>
  <h1>{{name}}</h1>
  <div v-html="description" />
  <tags v-bind:tags="tags" />
  <code><pre>@import "{{ importPath }}";</pre></code>
  <div class="variable" v-for="(decl) in declarations">
    <h2><pre>{{decl.name}}</pre></h2>
    <tags v-bind:tags="decl.tags" />

      <ColorDemo v-if="decl.render === 'color'":color="decl.value"></ColorDemo>

    <div v-else>
      <h3>Value</h3>
      <code><pre>{{decl.value}}</pre></code>
    </div>
    <div v-html="decl.description" />
  </div>
</Frame>

</template>

<script>
import Tags from './component/Tags';
import Backlink from './component/Backlink';
import ColorDemo from './component/ColorDemo';
import Frame from './frame';

export default {
  components: { Tags, Frame, Backlink, ColorDemo },
  props: {
    name: String,
    description: String,
    importPath: String,
    tags: Object,
    declarations: Array,
  },
};</script>



<style>
.variable{
  margin-bottom: 3em;
}
</style>
