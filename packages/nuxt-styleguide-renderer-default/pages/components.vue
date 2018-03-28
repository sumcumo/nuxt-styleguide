<template>
  <Frame>
    <a :href="$styleguide.path">Back</a>
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
export default {
  components: {
    Frame,
  },
};</script>
