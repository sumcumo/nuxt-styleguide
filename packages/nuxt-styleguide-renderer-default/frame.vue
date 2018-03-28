<template lang="html">
  <div class="frame">
    <div class="sidebar__placebo">
      <div class="sidebar">
        <StyleguideNav />
      </div>
    </div>
    <div class="content">
    <slot></slot>
    </div>
  </div>
</template>

<script>
import StyleguideNav from './nav';
export default {
  components: {
    StyleguideNav,
  },
};</script>
<style lang="css">

body{
  padding: 0;
  margin: 0;
}


.frame{
  font-family: Avenir, sans-serif;
  --blue-color: #0785b9;
  --red-color: #d53140;
  --yellow-color: #ebc500;
  --turquoise-color: #55b0b7;
  --green-color: #00555f;
  --purple-color: #9c488c;
  --white-color: #fff;
  --brown-color: #8f5b00;
  --pink-color: #f08697;

  --sidebar-width: 250px;
  display: grid;
  justify-content: start;
  grid-template-columns: var(--sidebar-width) auto;
  grid-column-gap: 1em;
}


.sidebar__placebo{
}

.sidebar{
  width: var(--sidebar-width);
  height: 100vh;
  position: fixed;
  background: black;
  color: white;
}

.content{
  padding-top: 1em;
  box-sizing: border-box;
  max-width: 100%;
  overflow: hidden;
}

h1{
  text-transform: uppercase;
  font-weight: 900;
}

a{
  color: var(--blue-color);
}
</style>
