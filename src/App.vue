<template>
  <v-app>
    <v-main>
      <div class="background d-flex justify-start align-center flex-column">
        <div class="d-flex justify-center align-start">
          <v-btn
            v-for="item in quicklinks"
            :key="item.id"
            class="ma-10"
            outlined
            medium
            fab
            color="cecece"
            @click="redirect(item.link)"
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </div>
        <h1 class="clock unselectable mt-10">
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
export default {
  name: "App",
  data: () => ({
    hourMinuteTimestamp: "",
    searchValue: "",
    quicklinks: [
      {
        id: 1,
        link: "https://www.facebook.com/",
        icon: "mdi-facebook"
      },
      {
        id: 2,
        link: "https://www.youtube.com/",
        icon: "mdi-youtube"
      },
      {
        id: 3,
        link: "https://calendar.google.com/",
        icon: "mdi-calendar"
      },
      {
        id: 4,
        link: "https://mail.google.com/",
        icon: "mdi-gmail"
      },
      {
        id: 5,
        link: "https://www.office.com/",
        icon: "mdi-microsoft-office"
      },
      {
        id: 6,
        link: "https://github.com/sYntaxHub",
        icon: "mdi-github"
      },
      {
        id: 7,
        link: "https://discord.com/",
        icon: "mdi-discord"
      }
    ]
  }),
  created() {
    if (this.$cookies.isKey("userLinks")) {
      console.log(this.$cookies.get("userLinks"));
      this.quicklinks = this.$cookies.get("userLinks");
    }
    this.getCurrentTime();
    setInterval(this.getCurrentTime, 1000);
  },
  beforeDestroy() {
    if (this.quicklinks != null) {
      console.log(this.$cookies.get("userLinks"));
      this.$cookies.set("userLinks", this.quicklinks);
    }
  },
  methods: {
    getCurrentTime: function() {
      const today = new Date();
      let hours = today.getHours();
      hours = (hours < 10 ? "O" : "") + hours.toString();
      let minutes = today.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes.toString();
      }
      this.hourMinuteTimestamp = hours + ":" + minutes;
    },
    redirect: function(link) {
      window.location.href = link;
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

.clock
  font-size: 15vw
  font-family: "Lucida Console", Monaco, monospace
  font-weight: normal

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
