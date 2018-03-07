<template>
  <Wrap>
    <Header>Nexible</Header>
      <Headline level="2">Components</Headline>
      <nav>
        <ul>
          <li v-for="(route) in $styleguide.routes" v-if="route.category === 'Components'">
            <a v-bind:href="route.path">{{route.name}}</a>
          </li>
        </ul>
      </nav>
    </Wrap>
</template>

<script>
import Wrap from '../wrap/wrap';
import Header from '../header/header';
import Headline from '../headline/headline';

export default {
  components: { Wrap, Header, Headline },
};
</script>

<style lang="scss">
</style>
