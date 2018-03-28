<template>
  <Frame>
    <main>
      <StyleguideNav></StyleguideNav>
      <h1>Your library</h1>
      <a v-bind:href="$styleguide.path + '/components'" >Components</a>
    </main>
  </Frame>
</template>


<script>
import Frame from '../frame';
import StyleguideNav from '../nav';
import Backlink from '../component/Backlink';

export default {
  components: {
    StyleguideNav,
    Frame,
    Backlink,
  },
};</script>
