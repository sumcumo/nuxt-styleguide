<template>
<Wrap>
  <Header>Nexible</Header>
  <a href=".." class="href">Back</a>
  <Headline level="2">{{name}}</Headline>
  <div v-if="description" v-html="description" />

  <tags v-bind:tags="tags" />
  
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

  <h2 v-if="hasProps">Props</h2>
  <div v-if="hasProps" v-for="(entry, name) in props">
    <h3>{{name}}<span v-if="entry.type">&#32;<code>[{{entry.type.name}}]</code></span></h3>
    <div v-html="entry.description" />
    <tags v-bind:tags="entry.tags" />
  </div>

  <h2 v-if="hasSlots">Slots</h2>
  <div v-if="hasSlots" v-for="(entry, name) in slots">
    <h3>{{name}}</h3>
    <div v-html="entry.description" />
    <tags v-bind:tags="entry.tags" />
  </div>

  <h2 v-if="hasEvents">Events</h2>
  <div v-if="hasEvents" v-for="(entry, name) in events">
    <h3>{{name}}<span v-if="entry.type">&#32;<code>[{{entry.type.name}}]</code></span></h3>
    <div v-html="entry.description" />
    <tags v-bind:tags="entry.tags" />
  </div>

  <h2 v-if="hasMethods">Methods</h2>
  <div v-if="hasMethods" v-for="(entry, name) in methods">
    <h3>{{name}}<span v-if="entry.params">({{entry.params.map(({ name, type }) => {
      return `${name}${type ? `: ${type.name}` : ''}`
    }).join(', ')}})</span></h3>
    <div v-html="entry.description" />
    <h4 v-if="entry.returns">Return Value<code v-if="entry.returns.type">[{{entry.returns.type.name}}]</code></h4>
    <p v-if="entry.returns" v-html="entry.returns.description" />
    <h4 v-if="entry.params">Parameters</h4>
    <ul v-if="entry.params">
      <li v-for="(param) in entry.params">
        {{param.name}}<code v-if="param.type">[{{param.type.name}}]</code>
        <p v-html="param.description" />
      </li>
    </ul>
    <tags v-bind:tags="filterMethodTags(entry.tags)" />
  </div>
</Wrap>
</template>

<script>

import Wrap from '../wrap/wrap';
import Headline from '../headline/headline';
import Code from '../code/code';
import Header from '../header/header';
import StyleguideNav from '../nav';
import Tags from './Tags';

export default {
  components: { StyleguideNav, Wrap, Headline, Header, Code, Tags },
  computed: {
    hasSlots() {
      return Object.keys(this.slots).length !== 0
    },
    hasMethods() {
      return Object.keys(this.methods).length !== 0
    },
    hasProps() {
      return Object.keys(this.props).length !== 0
    },
    hasEvents() {
      return Object.keys(this.events).length !== 0
    }
  },
  data() {
    return {
      filterMethodTags(tags) {
        return Object.keys(tags).reduce((memo, tagName) => {
          if (['params', 'returns'].indexOf(tagName) === -1) {
            memo[tagName] = tags[tagName];
          }

          return memo;
        }, {})
      }
    }
  },
  props: {
    Comp: Object,
    name: String,
    description: String,
    states: Array,
    importPath: String,
    props: Object,
    events: Object,
    slots: Object,
    tags: Object,
    methods: Object
  },
}

</script>