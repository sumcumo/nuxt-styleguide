<template lang="html">
  <div class="sum-wrap">
    <slot></slot>
    <Fonts></Fonts>
  </div>
</template>

<script>
import Fonts from '../fonts/fonts';

export default {
  components: {
    Fonts,
  },
};
</script>

<style lang="css">
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


}

</style>
