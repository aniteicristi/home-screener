<template>
  <div>
    <div>
      <div class="clock unselectable">{{ this.hour }} : {{ this.minute }}</div>
    </div>
    <div class="d-flex align-start justify-center mb-8">
      <div class="date unselectable">
        {{ this.weekday }} {{ this.day }} {{ this.month }} {{ this.year }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    minute: "",
    hour: "",
    day: "",
    month: "",
    year: "",
    weekday: ""
  }),
  created() {
    this.setCurrentTime();
    setInterval(this.setCurrentTime, 1000);
  },
  methods: {
    setCurrentTime: function() {
      const today = new Date();
      this.hour =
        (today.getHours() < 10 ? "0" : "") + today.getHours().toString();
      this.minute =
        (today.getMinutes() < 10 ? "0" : "") + today.getMinutes().toString();
      // eslint-disable-next-line prettier/prettier
      let months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
      this.month = months[today.getMonth()];
      this.year = today.getFullYear();
      this.day = today.getDate();
      // eslint-disable-next-line prettier/prettier
      let weekdays = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
      this.weekday = weekdays[today.getDay()];
    }
  }
};
</script>

<style lang="sass" scoped>

.unselectable
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

.clock
  font-size: 15vw
  line-height: 15vw
  height:13vw
  font-family: "Roboto Condensed"

.date
  font-size: 3vw
  line-height: 6vw
  height:6vw
  font-family: "Roboto Condensed"

@media only screen and (max-width: 800px)
  .clock
    font-size: 30vw
    line-height: 30vw
    height:26vw
  .date
    font-size: 6vw
    line-height: 12vw
    height: 12vw
</style>
