<template>
  <div class="topbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Topbar',
}
</script>


<style>
.topbar {
  top: 0;
  width: 100%;
  left: 0;
  position: fixed;
  height: 70px;
  background: #fff;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
}
</style>
