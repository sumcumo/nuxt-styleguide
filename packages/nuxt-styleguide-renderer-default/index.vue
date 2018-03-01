<template>
    <div class="sum-wrap">
      <Header>Nexible</Header>
      <Grid>
        <Card :style='{"--card-color": "var(--sum-green)"}'>Sketch Library</Card>
        <Card :style='{"--card-color": "var(--sum-red)"}'>Colors</Card>
        <Card :style='{"--card-color": "var(--sum-purple)"}'>Gitlab Repo</Card>
        <Card :style='{"--card-color": "var(--sum-brown)"}'>Components</Card>
      </Grid>
      <Footer></Footer>
      <Font></Font>

    </div>
</template>

<script>
import StyleguideNav from './nav';
import Card from './card/card';
import Grid from './grid/grid';
import Header from './header/header';
import Font from './fonts/fonts';
import Footer from './footer/footer';
import Headline from './headline/headline';
export default {
  components: { StyleguideNav, Card, Header, Headline, Grid, Footer, Font },
};
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
.sum-wrap {
  --sum-primary-color: #000;
  --sum-primary-gray: #f5f5f5;
  --sum-secondary-gray: #666;
  --sum-third-gray: #333;

  --sum-blue: #0785b9;
  --sum-yellow: #ebc500;
  --sum-red: #d53140;
  --sum-turquoise: #55b0b7;
  --sum-green: #00555f;
  --sum-purple: #9c488c;
  --sum-white: #fff;
  --sum-brown: #8f5b00;
  --sum-pink: #f08697;

  --sum-font: "GothamHTF-Book", arial, sans-serif;
  --sum-font-black: "GothamHTF-Black", arial, sans-serif;
  --sum-font-bold: "GothamHFT-Bold", arial, sans-serif;
  --sum-font-light: "GothamHTF-Light", arial, sans-serif;

  font-family: var(--sum-font);
  max-width: 1024px;
  margin: 0 auto;

  display: grid;
  min-height: 100vh;
  grid-template-rows: auto auto auto;
  grid-template-columns: 1fr;
  align-content: space-between;
}

</style>
