<template>
  <v-app>
    <v-main transition="fade-transition">
      <div class="background d-flex justify-start align-center flex-column">
        <quickLinks></quickLinks>
        <clock class="my-16"></clock>
        <searchBar></searchBar>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import quickLinks from "./components/quickLinks";
import clock from "./components/clock";
import searchBar from "./components/searchBar";

export default {
  name: "App",
  components: {
    quickLinks,
    clock,
    searchBar
  }
};
</script>

<style lang="sass" scoped>

.background
  width: 100vw
  height: 100vh
  background-color: #3b3b3b
  background-size: cover
  background-image: url('./assets/background.jpg')
</style>
