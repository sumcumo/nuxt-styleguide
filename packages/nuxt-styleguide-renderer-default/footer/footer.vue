<template lang="html">
  <footer>
    <div class="sum-logo">
      This is what you get when you work with
      <a href="https://www.sumcumo.com/"><img src="https://www.sumcumo.com/_nuxt/img/sumcumo-logo.4dd7766.svg" alt=""></a>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">

.sum-logo {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 1em;
}

.sum-logo img {
  display: block;
  width: 140px;
  margin: 0 0.5em;
}

@media (max-width: 800px) {
  .sum-logo {
    text-align: center;
    width: 100%;
    flex-direction: column;
  }
  .sum-logo img {
    margin-top: 1em;
  }
}
</style>
