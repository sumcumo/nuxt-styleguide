<template>
<div>
  <a :href="$styleguide.path" class="href">Back</a>
  <h1>{{name}}</h1>
  <div v-html="description" />
  <tags v-bind:tags="tags" />
  <code><pre>@import "{{ importPath }}";</pre></code>
  <div v-for="(decl) in declarations">
    <h2><pre>{{decl.name}}</pre></h2>
    <div v-html="decl.description" />
    <tags v-bind:tags="decl.tags" />
    
    <div v-if="decl.render === 'color'">
      <div v-bind:style="{ backgroundColor: decl.value, height: '50px', width: '50px' }" />
    </div>
    <div v-else>
      <h3>Value</h3>
      <code><pre>{{decl.value}}</pre></code>
    </div>
  </div>
</div>
</template>

<script>
import Tags from './component/Tags';

export default {
  components: { Tags },
  props: {
    name: String,
    description: String,
    importPath: String,
    tags: Object,
    declarations: Array
  }
}
</script>