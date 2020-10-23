<template>
  <div>
    <v-text-field
      class="search-bar"
      type="text"
      v-model="searchValue"
      solo
      label="Search..."
      rounded
      clearable
      background-color="secondary"
      prepend-inner-icon="mdi-google"
      autofocus
      filled
      hide-details="auto"
      @keyup.enter="search()"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchValue: ""
  }),
  computed: {
    webSearchValue: function() {
      return this.searchValue.replace(" ", "+");
    },
    requestSearchValue: function() {
      return this.searchValue.replace(" ", "_");
    },
    searching: function() {
      return this.searchValue.length > 0;
    }
  },
  methods: {
    search: function() {
      console.log(this.searchValue);
      if (this.searching) {
        let search =
          "https://www.google.ro/search?authuser=0&sxsrf=ALeKk00dRF1sQx40V4ouhuvVpt3SQDwzeQ%3A1601834766468&ei=Dg96X7iMHKGalwT5iK6ABQ&q=";
        window.location.href = search + this.webSearchValue;
        this.suggestValues = null;
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.search-bar
  margin: 0
  width: 40vw

@media only screen and (max-width: 800px)
  .search-bar
    width: 80vw
</style>
