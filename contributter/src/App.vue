<template>
  <div id="app"><router-view /></div>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.text-shadow {
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
}
</style>
