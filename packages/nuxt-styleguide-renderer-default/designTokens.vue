<template>
<Frame>

  <Backlink href="../"></Backlink>
  <h1>{{name}}</h1>
  <div v-html="description" />
  <tags v-bind:tags="tags" />
  <code><pre>@import "{{ importPath }}";</pre></code>
  <div class="variable" v-for="(decl) in declarations">
    <h2><pre>{{decl.name}}</pre></h2>
    <tags v-bind:tags="decl.tags" />

      <ColorDemo v-if="decl.render === 'color'":color="decl.value"></ColorDemo>
      <FontSizeDemo v-else-if="decl.render === 'fontSize'" :size="decl.value"></FontSizeDemo>
      <LineHeightDemo v-else-if="decl.render === 'lineHeight'" :size="decl.value"></LineHeightDemo>
      <FontFamilyDemo v-else-if="decl.render === 'fontFamily'" :family="decl.value"></FontFamilyDemo>


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
import FontFamilyDemo from './component/FontFamilyDemo';
import FontSizeDemo from './component/FontSizeDemo';
import LineHeightDemo from './component/LineHeightDemo';
import Frame from './frame';

export default {
  components: { Tags, Frame, Backlink, ColorDemo, FontSizeDemo, FontFamilyDemo, LineHeightDemo},
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
  margin-bottom: 6em;
}
</style>
