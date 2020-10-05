<template>
  <v-app>
    <v-main>
      <div class="background d-flex justify-start align-center flex-column">
        <quickLinks class="quick-links"></quickLinks>

        <h1 class="clock unselectable mt-16">
          {{ this.hourMinuteTimestamp }}
        </h1>
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

export default {
  name: "App",
  components: {
    quickLinks
  },
  data: () => ({
    hourMinuteTimestamp: "",
    searchValue: ""
  }),
  created() {
    this.setCurrentTime();
    setInterval(this.setCurrentTime, 1000);
  },
  methods: {
    setCurrentTime: function() {
      const today = new Date();
      let hours = today.getHours();
      hours = (hours < 10 ? "O" : "") + hours.toString();
      let minutes = today.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes.toString();
      }
      this.hourMinuteTimestamp = hours + ":" + minutes;
    },
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

.clock
  font-size: 15vw
  font-family: "Lucida Console", Monaco, monospace
  font-weight: normal

.quick-links
  width: 100vw

.search-bar
  width: 40vw

.unselectable
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

@media only screen and (max-width: 800px)
  .clock
    font-size: 30vw
  .search-bar
    width: 80vw
</style>
