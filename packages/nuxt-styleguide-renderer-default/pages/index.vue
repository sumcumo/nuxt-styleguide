<template>
    <main>
      <StyleguideNav></StyleguideNav>
      <h1>Your library</h1>
      <a v-bind:href="$styleguide.path + '/components'" >Components</a>
    </main>
</template>

<script>
import StyleguideNav from '../nav';
export default {
  components: {
    StyleguideNav,
  },
};
</script>
