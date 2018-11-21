<template>
  <div id="home" class="bg-green text-white">
    <div id="home-content"><router-view /></div>
  </div>
</template>

<style lang="scss" scoped>
#home {
  width: 100vw;
  min-height: 100vh;
}

#home-content {
  padding: 30px;
  max-width: 1080px;
  margin: 0 auto;
}
</style>
