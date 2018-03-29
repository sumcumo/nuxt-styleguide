<template lang="html">
  <div class="line-height-demo">
    <div class="line-height-demo-box" :style='{height: this.size}'>
    </div>
    {{this.size}}
</div>
</template>

<script>
export default {
  props: {
    size: String,
  }
}
</script>

<style lang="css">
  .line-height-demo{
      display: flex;
  }
  .line-height-demo-box{
    margin-right: 1em;
    width: 20px;
    display: flex;
    justify-content: center;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
  .line-height-demo-box:after{
    content: ' ';
    height: 100%;
    display: block;
    background: #000;
    width: 1px;
  }
</style>
