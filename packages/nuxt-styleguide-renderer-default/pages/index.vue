<template>
    <Wrap>
      <div class="home">

      <Header>Nexible</Header>
      <Grid>
        <Card v-bind:href="$styleguide.path + '/components'" :style='{"--card-color": "var(--sum-brown)"}'>Components</Card>
      </Grid>
      <Footer></Footer>
    </div>

    </Wrap>
</template>

<script>
import StyleguideNav from '../nav';
import Card from '../card/card';
import Grid from '../grid/grid';
import Header from '../header/header';
import Footer from '../footer/footer';
import Headline from '../headline/headline';
import Wrap from '../wrap/wrap';
export default {
  components: {
    StyleguideNav,
    Card,
    Header,
    Headline,
    Grid,
    Footer,
    Wrap,
  },
};
</script>

<style lang="scss">

.home{
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto auto auto;
  grid-template-columns: 1fr;
  align-content: space-between;
}
</style>
