<template>
  <v-sheet color="#3b3b3b" elevation="6">
    <v-slide-group class="px-2 py-1" show-arrows>
      <v-slide-item v-for="item in quicklinks" :key="item.id">
        <v-chip
          :href="item.link"
          :draggable="editing == true"
          :close="editing == true"
          @click:close="deleteLink(item.id)"
          class="mx-1 my-1 body-2"
          color="#cecece"
          close-icon="mdi-close-outline"
          outlined
          link
        >
          <v-icon left small>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-chip>
      </v-slide-item>

      <v-slide-item>
        <v-btn
          class="mx-1 my-1"
          outlined
          x-small
          fab
          color="#6b6b6b"
          :disabled="editing == true"
          @click="editing = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="editing == true" color="#3b3b3b">
        <div class="d-flex flex-column justify-center align-start ma-5">
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
  </v-sheet>
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
      this.newLink = this.newLink == "" ? "mdi-link" : this.newLink;
      let newLink = {
        id: this.quicklinks.length,
        title: this.newTitle,
        link: this.newLink,
        icon: this.newIcon
      };
      this.quicklinks.push(newLink);
      this.resetForm();
    },
    resetForm() {
      this.newLink = "";
      this.newTitle = "";
      this.newIcon = "";
      this.editing = false;
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
  width: 30vw
</style>
