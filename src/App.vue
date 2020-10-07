<template>
  <v-app>
    <v-main>
      <div class="background d-flex justify-start align-center flex-column">
        <quickLinks></quickLinks>
        <clock class="my-16"></clock>
        <v-text-field
          class="search-bar"
          type="text"
          v-model="searchValue"
          solo
          label="Search..."
          :rounded="true"
          :clearable="true"
          background-color="#2b2b2b"
          prepend-inner-icon="mdi-google"
          :autofocus="true"
          @keyup.enter="search()"
        ></v-text-field>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import quickLinks from "./components/quickLinks";
import clock from "./components/clock";

export default {
  name: "App",
  components: {
    quickLinks,
    clock
  },
  data: () => ({
    searchValue: ""
  }),
  methods: {
    search: function() {
      console.log(this.searchValue);
      if (this.searchValue.length > 0) {
        let search =
          "https://www.google.ro/search?authuser=0&sxsrf=ALeKk00dRF1sQx40V4ouhuvVpt3SQDwzeQ%3A1601834766468&ei=Dg96X7iMHKGalwT5iK6ABQ&q=";
        window.location.href = search + this.searchValue.replace(" ", "+");
      }
    }
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

.search-bar
  width: 40vw

@media only screen and (max-width: 800px)
  .search-bar
    width: 80vw
</style>
