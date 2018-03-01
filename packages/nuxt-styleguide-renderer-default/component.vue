<template>
<div>
  <h2>{{name}}</h2>
  <code><pre>import {{name}} from '{{importPath}}';</pre></code>
  <div v-if="docs" v-html="docs" />
  <h3>Demo:</h3>
  <div v-for="(state) in states">
    <h3>{{state.title}}</h3>
    <component v-bind:is="Comp" v-bind="state.props">
        <span v-for="(slot, name) in state.slots" v-bind:slot="name" key="name">
          {{slot}}
        </span>
    </component>
  </div>
</div>
</template>

<script>

export default {
  props: {
    Comp: Object,
    name: String,
    docs: String,
    states: Array,
    importPath: String
  }
}

</script>