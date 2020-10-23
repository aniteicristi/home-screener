<template>
  <div>
    <v-sheet color="accent" class="quick-links">
      <v-slide-group class="px-2 py-1" show-arrows="always" ref="chipGroup">
        <v-slide-item v-for="item in quicklinks" :key="item.id">
          <v-chip
            :href="editing == false ? item.link : undefined"
            :close="editing == true"
            @click:close="deleteLink(item.id)"
            class="mx-1 my-1 body-2"
            :color="
              selectedLink != null &&
              selectedLink.id == item.id &&
              editing == true
                ? 'primary'
                : '#cecece'
            "
            close-icon="mdi-close"
            outlined
            link
            @click="selectLink(item.id)"
          >
            <v-icon left small>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-chip>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <div class="toolbar">
      <v-btn
        class="ma-1"
        outlined
        x-small
        fab
        color="#FFFFFF"
        :disabled="editing == true"
        @click="toggleEditing()"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        class="ma-1"
        outlined
        x-small
        fab
        color="#FFFFFF"
        :disabled="creating == true"
        @click="toggleCreating()"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-expand-transition>
      <v-sheet
        class="new-link-sheet"
        v-if="editing == true || creating == true"
        color="accent"
      >
        <div
          class="d-flex flex-column justify-center align-start mt-12 mb-5 mx-5"
        >
          <v-text-field
            class="form"
            v-model="selectedLink.title"
            color="primary"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            class="form"
            v-model="selectedLink.link"
            color="primary"
            label="Link"
            required
          ></v-text-field>
          <v-text-field
            class="form"
            v-model="selectedLink.icon"
            color="primary"
            label="Icon"
          ></v-text-field>
          <div class="form d-flex justify-space-between">
            <v-btn tile outlined color="#FFFFFF" @click="resetForm()">
              Cancel
            </v-btn>
            <v-btn
              tile
              v-if="creating == true"
              outlined
              color="primary"
              :disabled="!formIsValid"
              @click="addLink()"
            >
              Create
            </v-btn>
            <div class="d-flex align-center" v-if="editing == true">
              <v-btn
                tile
                class="mx-1"
                outlined
                icon
                color="primary"
                :disabled="!selecting || selectedLink.id == 0"
                @click="shiftLinkLeft()"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-btn
                tile
                class="mx-1"
                outlined
                icon
                color="primary"
                :disabled="
                  !selecting || selectedLink.id == quicklinks.length - 1
                "
                @click="shiftLinkRight()"
              >
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
              <v-btn
                outlined
                tile
                color="primary"
                :disabled="!formIsValid"
                @click="editLink()"
              >
                Save
              </v-btn>
            </div>
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
    creating: false,
    selecting: false,
    quicklinks: [],
    selectedLink: null,
    defaultSelectedLink: {
      id: -1,
      title: "",
      link: "",
      icon: ""
    },
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
    this.selectedLink = this.defaultSelectedLink;
  },
  beforeDestroy() {
    localStorage.setItem("links", JSON.stringify(this.quicklinks));
  },
  watch: {
    quicklinks(newList) {
      this.localStoreLinks(newList);
    }
  },
  methods: {
    deleteLink: function(id) {
      this.quicklinks.splice(id, 1);
      for (let i = id; i < this.quicklinks.length; ++i) {
        this.quicklinks[i].id--;
      }
      if (id == this.selectedLink.id) {
        this.selecting = false;
        this.selectedLink = this.defaultSelectedLink;
      }
    },
    addLink: function() {
      if (this.selectedLink.icon == "")
        this.selectedLink.icon = "mdi-link-variant";
      let newLink = {
        id: this.quicklinks.length,
        title: this.selectedLink.title,
        link: this.selectedLink.link,
        icon: this.selectedLink.icon
      };
      this.quicklinks.push(newLink);
      this.resetForm();
    },
    editLink: function() {
      if (this.selectedLink.icon == "")
        this.selectedLink.icon = "mdi-link-variant";
      this.quicklinks[this.selectedLink.id] = this.selectedLink;
      this.localStoreLinks(this.quicklinks);
      this.resetForm();
    },
    selectLink: function(id) {
      this.selectedLink = {
        id: this.quicklinks[id].id,
        title: this.quicklinks[id].title,
        link: this.quicklinks[id].link,
        icon: this.quicklinks[id].icon
      };
      this.selecting = true;
    },
    shiftLinkRight: function() {
      if (this.selecting == true) {
        let aux = this.quicklinks[this.selectedLink.id];
        // eslint-disable-next-line prettier/prettier
        this.quicklinks[this.selectedLink.id] = this.quicklinks[ this.selectedLink.id + 1 ];
        this.quicklinks[this.selectedLink.id + 1] = aux;
        this.quicklinks[this.selectedLink.id].id--;
        this.quicklinks[this.selectedLink.id + 1].id++;
        this.selectLink(this.selectedLink.id + 1);
        this.localStoreLinks(this.quicklinks);
      }
    },
    shiftLinkLeft: function() {
      if (this.selecting == true) {
        let aux = this.quicklinks[this.selectedLink.id];
        // eslint-disable-next-line prettier/prettier
        this.quicklinks[this.selectedLink.id] = this.quicklinks[ this.selectedLink.id - 1 ];
        this.quicklinks[this.selectedLink.id - 1] = aux;
        this.quicklinks[this.selectedLink.id].id++;
        this.quicklinks[this.selectedLink.id - 1].id--;
        this.selectLink(this.selectedLink.id - 1);
        this.localStoreLinks(this.quicklinks);
      }
    },
    resetForm: function() {
      this.selectedLink = this.defaultSelectedLink;
      this.editing = false;
      this.creating = false;
      this.selecting = false;
      this.$refs.chipGroup.scrollOffset = 0;
    },
    toggleEditing: function() {
      this.editing = !this.editing;
      this.$refs.chipGroup.scrollOffset = 0;
      this.creating = false;
    },
    toggleCreating: function() {
      this.selectedLink = this.defaultSelectedLink;
      this.creating = !this.creating;
      this.$refs.chipGroup.scrollOffset = 0;
      this.editing = false;
    },
    localStoreLinks: function(newList) {
      localStorage.setItem("links", JSON.stringify(newList));
    }
  },
  computed: {
    formIsValid() {
      return this.selectedLink.title && this.selectedLink.link;
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
