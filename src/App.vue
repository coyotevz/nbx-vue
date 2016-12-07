<template>
  <div id="app" v-md-theme="'default'">
    <md-whiteframe md-elevation="2">
      <md-toolbar>
        <h1 class="md-title">NBX Suppliers</h1>
      </md-toolbar>
    </md-whiteframe>

    <p>
      <!-- use router-link component for navigation -->
      <!-- specify the link by passing the `to` property -->
      <!-- <router-link> will be rendered as an `<a>` tag by default -->
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
    </p>

    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>

    <div class="main-content">
      <supplier-list></supplier-list>
    </div>

  </div>
</template>

<script>
import SupplierList from './components/Supplier.vue'

export default {
  name: 'app',
  components: {
    SupplierList
  }
}
</script>

<style>
.main-content {
  padding: 16px;
}
</style>
