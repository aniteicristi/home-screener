<template>
  <v-app>
    <v-main>
      <div class="background d-flex justify-center align-center flex-column">
        <h1 class="clock">{{ this.hourMinuteTimestamp }}</h1>
        <div class="d-flex justify-center align-start">
          <v-btn
            v-for="item in quicklinks"
            :key="item.id"
            class="ma-10"
            outlined
            large
            fab
            color="white"
            @click="redirect(item.link)"
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    hourMinuteTimestamp: "",
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
        id: 6,
        link: "https://discord.com/",
        icon: "mdi-discord"
      }
    ]
  }),
  created() {
    setInterval(this.getCurrentTime, 1000);
  },
  methods: {
    getCurrentTime: function() {
      const today = new Date();
      let hours = today.getHours();
      if (hours < 10) {
        hours = "0" + hours.toString();
      }
      let minutes = today.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes.toString();
      }
      this.hourMinuteTimestamp = hours + ":" + minutes;
    },
    redirect: function(link) {
      window.location.href = link;
    }
  }
};
</script>

<style lang="sass" scoped>

.background
  width: 100vw
  height: 100vh
  background-image: url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9')
  background-size: cover
  background-repeat: no-repeat
.clock
  font-size: 200px
  font-family: "Lucida Console", Monaco, monospace
  font-weight: normal
</style>
