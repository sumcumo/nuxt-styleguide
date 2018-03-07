<template>
<Wrap>
  <Header>Nexible</Header>
  <a href=".." class="href">Back</a>
  <Headline level="2">{{name}}</Headline>
  <div v-if="docs" v-html="docs" />
  <h3>Demo:</h3>
  <div v-for="(state) in states">
    <Headline>{{state.title}}</Headline>
    <component v-bind:is="Comp" v-bind="state.props">
        <span v-for="(slot, name) in state.slots" v-bind:slot="name" key="name">
          {{slot}}
        </span>
    </component>
    <Code>import {{name}} from '{{importPath}}';</Code>
  </div>
</Wrap>
</template>

<script>
import Wrap from './wrap/wrap';
import Headline from './headline/headline';
import Code from './code/code';
import Header from './header/header';

import StyleguideNav from './nav';

export default {
  components: { StyleguideNav, Wrap, Headline, Header, Code },
  props: {
    Comp: Object,
    name: String,
    docs: String,
    states: Array,
    importPath: String,
  },
};
</script>
