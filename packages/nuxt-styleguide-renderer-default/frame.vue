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
        >
          <g>
            <path
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
        >
          <g>
            <path
              d="M0.861,0.026l9.743,9.743l-0.835,0.835l-9.743,-9.743l0.835,-0.835Z"
            />
            <path
              d="M0.001,9.79l9.789,-9.789l0.839,0.839l-9.789,9.789l-0.839,-0.839Z"
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

<style>
@import 'prismjs/themes/prism.css';

:root {
  --white: var(--theme-clr-white, #fff);
  --black: var(--theme-clr-black, #111);
  --grey-100: var(--theme-clr-gray-100, #f2f3f3);
  --grey-200: var(--theme-clr-gray-200, #e6e6e7);
  --grey-300: var(--theme-clr-gray-300, #cecfd0);
  --primary-color-200: var(----theme-clr-primary-200, #e7eff6);
  --primary-color-500: var(----theme-clr-primary-500, #0785b9);
  --primary-color-800: var(----theme-clr-primary-800, #294355);
  --secondary-color-200: var(----theme-clr-secondary-200, #e4f1f2);
  --secondary-color-500: var(----theme-clr-secondary-500, #55b0b7);
  --secondary-color-800: var(----theme-clr-secondary-800, #2f5457);
  --sidebarWidth: 250px;
}

body {
  padding: 0;
  margin: 0;
  min-width: 100vw;
}

body::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: var(--primary-color-500);
  z-index: 1337;
}

.frame {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: block;
  padding: 3em 0;
  width: 100vw;
}

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--black);
  color: var(--white);
  transform: translateY(-100vh);
  transition: transform 200ms ease-in;
  z-index: 42;
}

.sidebar__content {
  max-height: 100%;
  overflow: auto;
}

.content {
  box-sizing: border-box;
  max-width: 900px;
  margin-top: 5rem;
  padding: 1rem;
  line-height: 1.5;
}

h1 {
  font-weight: 700;
}

h1,
h2,
h3 {
  padding: 0 0 1rem;
  margin: 0;
}

p + h1,
p + h2,
p + h3 {
  margin-top: 3rem;
}
.content a {
  color: var(--primary-color-500);
}

.content pre {
  border-radius: 2px;
  padding: 0.7em;
  margin-bottom: 3rem;
}

.content p code,
.content h1 code,
.content h2 code,
.content h3 code {
  background-color: var(--grey-200);
  border-radius: 1px;
  padding: 0.1em 0.3em;
  font-size: 1.1em;
}

.hamburger {
  display: block;
  position: relative;
  width: 32px;
  position: fixed;
  right: 25px;
  top: 25px;
  z-index: 50;
  color: var(--black);
}

.hamburger svg {
  fill-rule: evenodd;
  clip-rule: evenodd;
  stroke-linejoin: round;
  stroke-miterlimit: 1.41421;
}

.icon-closed,
.icon-open {
  fill: currentColor;
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
#toggleNav:checked ~ .hamburger {
  color: var(--white);
}
#toggleNav:checked ~ .hamburger .icon-closed {
  display: none;
}
#toggleNav:checked ~ .hamburger .icon-open {
  display: block;
}

@media (min-width: 851px) {
  .hamburger {
    display: none;
  }
  .frame {
    display: grid;
    justify-content: start;
    grid-template-columns: 250px 1fr;
    grid-column-gap: 20px;
    padding: 0;
  }
  .content {
    grid-column: 2;
  }
  .sidebar {
    width: var(--sidebarWidth);
    height: 100vh;
    position: fixed;
    background: var(--grey-100);
    color: var(--black);
    border-top: 4px solid var(--primary-color-500);
    transform: none;
    transition: none;
  }
}

@media (min-width: 1140px) {
  .frame {
    grid-template-columns: var(--sidebarWidth) 1fr minmax(800px, 4fr) 1fr;
  }
  .content {
    grid-column: 3;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
