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

      <ui-toolbar :page-title="pageTitle"></ui-toolbar>

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
      pageTitle: 'Title'
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
  },
  mounted() {
    document.title = 'NBX - ' + this.pageTitle
  },
  components: {
    UiToolbar,
  },
}
</script>

<style lang="scss">
/*
.container {
  min-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  transition: $swift-ease-out;

  @media (min-width: $breakpoint-medium) {
    padding-left: $sidebar-size;
  }
  }
  */

/*
.main-sidebar.md-sidenav {
  .md-sidenav-content {
    width: $sidebar-size;
    display: flex;
    flex-flow: column;

    @media (min-width: $breakpoint-medium) {
      top: 0;
      pointer-events: auto;
      transform: translate3d(0, 0, 0);
      box-shadow: $material-shadow-2dp;
    }
  }

  .md-backdrop {
    @media (min-width: $breakpoint-medium) {
      opacity: 0;
      pointer-events: none;
    }
  }

  .md-toolbar {
    min-height: 172px;
    border-bottom: 1px solid rgba(#000, .12);
  }

  .nbx-logo {
    font-size: 24px;

    img {
      width: 160px;
      margin-bottom: 16px;
    }
  }

  .main-sidebar-links {
    overflow: auto;

    .md-inset .md-list-item-container {
      padding-left: 36px;
    }

    .md-list-item-container {
      font-size: 14px;
      font-weight: 500;
    }
  }
}

.main-content {
  padding: 16px;
  flex: 1;
  overflow: auto;
  background-color: #eee;

  @media (max-width: $breakpoint-small) {
    padding: 8px;
  }
  @media (max-width: $breakpoint-xsmall) {
    padding: 0;
  }
}

.page-content {
  flex: 1;
  display: flex;
  flex-flow: column;
  max-height: 100vh;
}

.main-header {
  position: relative;
  z-index: 2;

  .md-toolbar {
    color: #fff !important;

    .nav-trigger {
      @media (min-width: $breakpoint-medium) {
        display: none;
      }
    }

    .md-title {
      flex: 1;

      @media (min-width: $breakpoint-medium) {
        margin-left: 8px;
      }
    }
  }
  }
  */
</style>
