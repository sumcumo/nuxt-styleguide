<template>
  <Frame>
    <Backlink :href="$styleguide.path"></Backlink>
    <h2>Components</h2>
    <nav>
      <ul>
        <li v-for="(route) in $styleguide.routes" v-if="route.category === 'Components'">
          <a v-bind:href="route.path">{{route.name}}</a>
        </li>
      </ul>
    </nav>
  </Frame>
</template>

<script>
import Frame from '../frame';
import StyleguideNav from '../nav';
import Backlink from '../component/Backlink';

export default {
  components: {
    StyleguideNav,
    Backlink,
    Frame,
  },
};</script>
