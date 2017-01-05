<template>
  <md-toolbar md-theme="docs">
    <md-button class="md-icon-button nav-trigger" @click="toggleSidenav">
      <md-icon>menu</md-icon>
    </md-button>
    <div class="md-title">
      <router-link :to="to" exact>{{ pageTitle }}</router-link>
    </div>
    <ui-search></ui-search>
    <md-button class="md-icon-button">
      <md-icon>apps</md-icon>
    </md-button>
    <md-button class="md-icon-button">
      <md-icon>notifications</md-icon>
    </md-button>
    <md-button class="md-icon-button avatar-button">
      <md-avatar>
        <!-- TODO: Replace with user data -->
        <img src="../assets/avatar.png" alt="Avatar">
      </md-avatar>
    </md-button>
  </md-toolbar>
</template>

<script>
import UiSearch from 'ui/Search.vue'

export default {
  name: 'ui-toolbar',
  props: ['pageTitle', 'to'],
  methods: {
    toggleSidenav() {
      this.$parent.toggleSidenav()
    },
    setTitle(title) {
      this.pageTitle = title
      document.title = 'NBX - ' + title
    },
  },
  components: {
    UiSearch,
  },
}
</script>
