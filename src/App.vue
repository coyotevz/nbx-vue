<template>
  <div id="app" v-md-theme="'default'">
    <md-whiteframe md-elevation="2">
      <md-toolbar>
        <h1 class="md-title">NBX Suppliers</h1>
      </md-toolbar>
    </md-whiteframe>

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
