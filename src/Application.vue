<template>
  <div id="application" class="container">

    <md-sidenav :visible="true" class="main-sidenav md-left md-fixed"
      ref="main-sidenav">
      <md-toolbar class="nbx-logo" md-theme="white">
        <span>NBX app</span>
      </md-toolbar>

      <div class="sidenav-links">
        <md-list>
          <md-list-item>
            <router-link exact :to="{name: 'dashboard' }">Tablero</router-link>
          </md-list-item>
          <md-list-item>
            <span>Compras</span>
            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">
                  <router-link exact :to="{ name: 'suppliers:list' }">
                    Proveedores
                  </router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link exact :to="{ name: 'documents:list' }">
                    Facturas
                  </router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link exact :to="{ name: 'orders:list' }">
                    Pedidos
                  </router-link>
                </md-list-item>
                <md-list-item class="md-inset" disabled>
                  <span>Contactos</span>
                </md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>

          <md-list-item disabled>
            <span>Ventas</span>
          </md-list-item>
          <md-list-item disabled>
            <span>Cuentas</span>
          </md-list-item>
          <md-list-item disabled>
            <span>Acerca de</span>
          </md-list-item>
        </md-list>
      </div>
    </md-sidenav>

    <div class="page-content">

      <ui-toolbar :page-title="pageTitle" :to="to"></ui-toolbar>

      <div class="main-content">
        <router-view></router-view>
      </div>

    </div>

  </div>
</template>

<script>
import UiToolbar from 'ui/Toolbar.vue'

export default {
  name: 'application',
  data() {
    return {
      toolbar: true,
      pageTitle: 'Title',
      to: { path: '/' },
    }
  },
  methods: {
    toggleSidenav() {
      this.$refs['main-sidenav'].toggle()
    },
    openSidenar() {
      this.$refs['main-sidenav'].open()
    },
    closeSidenav() {
      this.$refs['main-sidenav'].close()
    },
    setTitle(title) {
      this.pageTitle = title
    },
    setCurrentRoute(current) {
      // TODO: needs more work...
      console.log('setCurrentRoute:', current)
      this.to = current
    }
  },
  mounted() {
    document.title = 'NBX - ' + this.pageTitle
  },
  components: {
    UiToolbar,
  },
}
</script>
