<template lang="html">
  <div class="frame">
    <div class="sidebar__placebo">
      <input
        id="toggleNav"
        type="checkbox"
      >
      <label
        for="toggleNav"
        class="hamburger"
      >
        <svg
          class="icon-closed"
          width="100%"
          height="100%"
          viewBox="0 0 12 10"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"
        >
          <g id="Burger">
            <path
              id="Rechteck-15-Kopie-4"
              d="M11.024,8.886l0,0.957l-11.024,0l0,-0.957l11.024,0Zm-11.024,-4.449l11.024,0l0,0.957l-11.024,0l0,-0.957Zm0,-4.437l11.024,0l0,0.944l-11.024,0l0,-0.944Z"
            />
          </g>
        </svg>
        <svg
          class="icon-open"
          width="100%"
          height="100%"
          viewBox="0 0 11 11"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"
        >
          <g id="Schliessen">
            <path
              id="Rechteck-15-Kopie-4"
              d="M0.861,0.026l9.743,9.743l-0.835,0.835l-9.743,-9.743l0.835,-0.835Z"
              style="fill:#fff;"
            />
            <path
              id="Rechteck-15-Kopie-41"
              d="M0.001,9.79l9.789,-9.789l0.839,0.839l-9.789,9.789l-0.839,-0.839Z"
              style="fill:#fff;"
            />
          </g>
        </svg>
      </label>
      <div class="sidebar">
        <div class="sidebar__content">
          <StyleguideNav />
        </div>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import StyleguideNav from './nav/nav.vue'

export default {
  components: {
    StyleguideNav,
  },
}
</script>

<style lang="scss">
@import './vars.scss';

body {
  padding: 0;
  margin: 0;
}

.frame {
  font-family: Avenir, sans-serif;
  display: grid;
  justify-content: start;
  grid-template-columns: $sidebarWidth 1fr;
  grid-column-gap: 3em;

  padding-right: 3em;
}

.sidebar__placebo {
}

.sidebar {
  width: $sidebarWidth;
  height: 100vh;
  position: fixed;
  border-right: 1px solid $grey;
}

.sidebar__content {
  max-height: 100%;
  overflow: auto;
}

.content {
  box-sizing: border-box;
  max-width: 100%;
  overflow: hidden;
}

h1 {
  text-transform: uppercase;
  font-weight: 900;
}

h1,
h2,
h3 {
  padding-top: 1.8em;
  padding-bottom: 0.5em;
  margin: 0;
}

a {
  color: $blueColor;
}

pre {
  background: $grey;
  border-radius: 2px;
  padding: 0.7em;
}

code {
  background: $grey;
  border-radius: 1px;
  padding: 0 0.3em;
  font-size: 1.1em;
}

.hamburger {
  display: none;
  position: relative;
  width: 50px;
  position: fixed;
  right: 25px;
  top: 25px;
  z-index: 50;
}
.icon-open {
  display: none;
}

#toggleNav {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: -1;
}

#toggleNav:checked ~ .sidebar {
  transform: translateY(0);
}
#toggleNav:checked ~ .hamburger .icon-closed {
  display: none;
}
#toggleNav:checked ~ .hamburger .icon-open {
  display: block;
}

@media (max-width: 850px) {
  .hamburger {
    display: block;
  }

  .frame {
    padding: 3em 2em;
    grid-template-columns: 1fr;
  }

  .sidebar {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: black;
    color: white;
    transform: translateY(-100vh);
  }
}
</style>
