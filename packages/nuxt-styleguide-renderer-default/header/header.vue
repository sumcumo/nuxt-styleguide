<template lang="html">
  <header class="sum-header">
    <a href="/">
      <Headline><slot /></Headline>
    </a>
  </header>
</template>

<script>
import Headline from '../headline/headline';

export default {
  components: { Headline },
};
</script>

<style lang="scss">

.sum-header{
padding: 2em 0.3em;

  a{
    color: inherit;
    text-decoration: none;
  }

}

</style>
