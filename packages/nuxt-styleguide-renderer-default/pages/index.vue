<template>
  <Frame>
    <main>
      <h1>{{$styleguide.name}}</h1>
    </main>
  </Frame>
</template>


<script>
import Frame from '../frame';
import StyleguideNav from '../nav';

export default {
  components: {
    StyleguideNav,
    Frame,
  },
};</script>
