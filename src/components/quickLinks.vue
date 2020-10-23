<template>
  <div>
    <v-sheet color="accent" class="quick-links">
      <v-slide-group class="px-2 py-1" show-arrows="always" ref="chipGroup">
        <v-slide-item v-for="item in quicklinks" :key="item.id">
          <v-chip
            :href="item.link"
            :draggable="editing == true"
            :close="editing == true"
            @click:close="deleteLink(item.id)"
            class="mx-1 my-1 body-2"
            color="#cecece"
            close-icon="mdi-close"
            outlined
            link
          >
            <v-icon left small>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-chip>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <div class="toolbar">
      <v-btn
        class="ma-2"
        outlined
        small
        fab
        color="#FFFFFF"
        :disabled="editing == true"
        @click="toggleEditing()"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-expand-transition>
      <v-sheet class="new-link-sheet" v-if="editing == true" color="secondary">
        <div
          class="d-flex flex-column justify-center align-start mt-12 mb-5 mx-5"
        >
          <v-text-field
            class="form"
            v-model="newTitle"
            color="primary"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            class="form"
            v-model="newLink"
            color="primary"
            label="Link"
            required
          ></v-text-field>
          <v-text-field
            class="form"
            v-model="newIcon"
            color="primary"
            label="Icon"
          ></v-text-field>
          <div class="form d-flex justify-space-between">
            <v-btn outlined color="#FFFFFF" @click="resetForm()">
              Cancel
            </v-btn>
            <v-btn
              outlined
              color="primary"
              :disabled="!formIsValid"
              @click="addLink()"
            >
              Create
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    editing: false,
    quicklinks: [],
    newLink: "",
    newTitle: "",
    newIcon: "",
    defaultLinks: [
      {
        id: 0,
        title: "Youtube",
        link: "https://www.youtube.com/",
        icon: "mdi-youtube"
      },
      {
        id: 1,
        title: "Gmail",
        link: "https://mail.google.com/",
        icon: "mdi-gmail"
      },
      {
        id: 2,
        title: "Github",
        link: "https://github.com/sYntaxHub",
        icon: "mdi-github"
      }
    ]
  }),
  created() {
    if (localStorage.getItem("links")) {
      try {
        this.quicklinks = JSON.parse(localStorage.getItem("links"));
      } catch (e) {
        localStorage.removeItem("links");
        this.quicklinks = this.defaultLinks;
      }
    } else {
      this.quicklinks = this.defaultLinks;
    }
  },
  beforeDestroy() {
    localStorage.setItem("links", JSON.stringify(this.quicklinks));
  },
  watch: {
    quicklinks(newList) {
      localStorage.setItem("links", JSON.stringify(newList));
    }
  },
  methods: {
    deleteLink: function(id) {
      this.quicklinks.splice(id, 1);
      for (let i = id; i < this.quicklinks.length; ++i) {
        this.quicklinks[i].id--;
      }
    },
    addLink: function() {
      if (this.newIcon == "") this.newIcon = "mdi-link-variant";
      let newLink = {
        id: this.quicklinks.length,
        title: this.newTitle,
        link: this.newLink,
        icon: this.newIcon
      };
      this.quicklinks.push(newLink);
      this.resetForm();
    },
    resetForm: function() {
      this.newLink = "";
      this.newTitle = "";
      this.newIcon = "";
      this.toggleEditing();
    },
    toggleEditing: function() {
      this.editing = !this.editing;
      this.$refs.chipGroup.scrollOffset = 0;
    }
  },
  computed: {
    formIsValid() {
      return this.newTitle && this.newLink;
    }
  }
};
</script>

<style lang="sass" scoped>
.form
  width: 23vw
.quick-links
  width: 100vw
.new-link-sheet
  width: 27vw
  position: absolute
  z-index: 0
.toolbar
  position: absolute
  z-index:2

@media only screen and (max-width: 800px)
  .new-link-sheet
    width: 100vw
  .form
    width: 80vw
</style>
