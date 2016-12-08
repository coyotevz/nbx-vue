<template>
  <md-sidenav class="main-sidenav md-left md-fixed" ref="main-sidebar">
    <md-toolbar class="nbx-logo" v-md-theme="'white'">
      <span>NBX App</span>
    </md-toolbar>

    <div class="main-sidebar-links">
      <md-list class="md-dense">
        <md-list-item>
          <span>Item 1</span>
        </md-list-item>

        <md-list-item>
          <span>Item 2</span>
        </md-list-item>

        <md-list-item>
          <span>Compras</span>
          <md-list-expand>
            <md-list-item class="md-inset">
              <span>Sub item 1</span>
            </md-list-item>
            <md-list-item class="md-inset">
              <span>Sub item 2</span>
            </md-list-item>
          </md-list-expand>
        </md-list-item>
      </md-list>
    </div>
  </md-sidenav>
</template>

<script>
export default {
}
</script>
