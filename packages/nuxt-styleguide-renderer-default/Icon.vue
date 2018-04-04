<template>
<div>
  <h1>{{name}}</h1>
  <img :src="iconUrl" />
</div>
</template>

<script>

export default {
  props: {
    name: String,
    iconUrl: String,
    importPath: String,
  },
};</script>



<style>
</style>
