<template>
  <sg-frame>
    <h1>{{ name }}</h1>
    <pre><code>import {{ importName }} from '{{ importPath }}';</code></pre>
    <h2>Demo:</h2>
    <div
      v-for="(state) in states"
      :key="state.title"
      class="component-demo"
    >
      <h4>{{ state.title }}</h4>
      <div :style="state.wrapperStyle">
        <sg-component-demo
          :wrapper="state.wrapper"
          :data="copy(state.data)"
          :comp="Comp"
        />
      </div>
      <br :style="{ clear: 'both' }">
      <code-view
        :comp="Comp"
        :data="copy(state.data)"
        :name="kebabName"
      />
    </div>

    <div
      v-if="description"
      v-html="description"
    />

    <sg-tags :tags="tags" />

    <div v-if="hasProps">
      <h3>Props</h3>
      <div
        v-for="(entry, name) in props"
        :key="name"
      >
        <h3>{{ name }}<span v-if="entry.type">&#32;<code>[{{ entry.type.name }}]</code></span></h3>
        <div v-html="entry.description" />
        <sg-tags :tags="entry.tags" />
      </div>
    </div>

    <div v-if="hasSlots">
      <h3>Slots</h3>
      <div
        v-for="(entry, name) in slots"
        :key="name"
      >
        <h3>{{ name }}</h3>
        <div v-html="entry.description" />
        <sg-tags :tags="entry.tags" />
      </div>
    </div>

    <div v-if="hasEvents">
      <h3>Events</h3>
      <div
        v-for="(entry, name) in events"
        :key="name"
      >
        <h3>{{ name }}<span v-if="entry.type">&#32;<code>[{{ entry.type.name }}]</code></span></h3>
        <div v-html="entry.description" />
        <sg-tags :tags="entry.tags" />
      </div>
    </div>

    <div v-if="hasMethods">
      <h3>Methods</h3>
      <div
        v-for="(entry, name) in methods"
        :key="name"
      >
        <h3>{{ name }}<span v-if="entry.params">({{ entry.params.map(({ name, type }) => {
          return `${name}${type ? `: ${type.name}` : ''}`
        }).join(', ') }})</span></h3>
        <div v-html="entry.description" />
        <h4 v-if="entry.returns">Return Value<code v-if="entry.returns.type">[{{ entry.returns.type.name }}]</code></h4>
        <p
          v-if="entry.returns"
          v-html="entry.returns.description"
        />
        <h4 v-if="entry.params">Parameters</h4>
        <ul v-if="entry.params">
          <li
            v-for="(param) in entry.params"
            :key="param.name"
          >
            {{ param.name }}<code v-if="param.type">[{{ param.type.name }}]</code>
            <p v-html="param.description" />
          </li>
        </ul>
        <sg-tags :tags="filterMethodTags(entry.tags)" />
      </div>
    </div>
  </sg-frame>
</template>

<style>
.component-demo {
  transform: translateX(1px);
}
</style>

<script>
import CodeView from './CodeView.vue'
import SgComponentDemo from './ComponentDemo.vue'
import SgStyleguideNav from '../nav/nav.vue'
import SgFrame from '../frame.vue'
import SgTags from './Tags.vue'

export default {
  components: { SgStyleguideNav, SgTags, SgFrame, SgComponentDemo, CodeView },
  props: {
    Comp: { type: Object, default: null },
    name: { type: String, default: null },
    importName: { type: String, default: null },
    kebabName: { type: String, default: null },
    description: { type: String, default: null },
    states: { type: Array, default: null },
    importPath: { type: String, default: null },
    props: { type: Object, default: null },
    events: { type: Object, default: null },
    slots: { type: Object, default: null },
    tags: { type: Object, default: null },
    methods: { type: Object, default: null },
  },
  data() {
    return {
      filterMethodTags(tags) {
        return Object.keys(tags || {}).reduce((memo, tagName) => {
          if (['params', 'returns'].indexOf(tagName) === -1) {
            // eslint-disable-next-line no-param-reassign
            memo[tagName] = tags[tagName]
          }

          return memo
        }, {})
      },
    }
  },
  computed: {
    hasSlots() {
      return Object.keys(this.slots || {}).length !== 0
    },
    hasMethods() {
      return Object.keys(this.methods || {}).length !== 0
    },
    hasProps() {
      return Object.keys(this.props || {}).length !== 0
    },
    hasEvents() {
      return Object.keys(this.events || {}).length !== 0
    },
  },
  methods: {
    copy(obj) {
      return { ...obj }
    },
  },
}
</script>
