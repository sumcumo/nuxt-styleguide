<template>
  <button :class="$style.button" @click="(e) => this.$emit('click', e)">
    <slot />
  </button>
</template>

<styleguide-doc lang="md">
# Hello From Styleguide Doc
</styleguide-doc>

<styleguide-states lang="json">
[{
  "title": "Default Button",
  "props": {},
  "content": "Hello World"
}]
</styleguide-states>

<style module>
.button {
  font-family: 'Cabin Sketch', cursive;
  border: 5px solid transparent;
  border-image: url("http://s3.amazonaws.com/dfc_attachments/images/3247065/sketchy_web.png") 30 30 round;
  padding: 0.2em 0.4em;
  font-size: 2rem;
  font-weight: default;
}
.button:hover {
  background-color: fuchsia;
}
</style>
