<template>
  <div id="application" class="container" md-theme="'default'">
    <md-sidenav :visible="true" class="main-sidebar md-left md-fixed" ref="main-sidebar">
      <md-toolbar class="nbx-logo" md-theme="white">
        <span>NBX app</span>
      </md-toolbar>

      <div class="main-sidebar-links">
        <md-list class="md-dense">
          <md-list-item disabled>
            <span>Tablero</span>
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
                <md-list-item class="md-inset" disabled>
                  <span>Facturas</span>
                </md-list-item>
                <md-list-item class="md-inset" disabled>
                  <span>Pedidos</span>
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
      <md-whiteframe md-elevation="1" class="main-header">
        <md-toolbar>
          <md-button class="md-icon-button nav-trigger" @click="toggleSidenav">
            <md-icon>menu</md-icon>
          </md-button>
          <div class="md-title">{{ pageTitle }}</div>

          <md-button class="md-icon-button">
            <md-icon>account_circle</md-icon>
          </md-button>
        </md-toolbar>
      </md-whiteframe>

      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
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
      this.$refs['main-sidebar'].toggle()
    },
    openSidenar() {
      this.$refs['main-sidebar'].open()
    },
    closeSidenav() {
      this.$refs['main-sidebar'].close()
    },
    setTitle(title) {
      this.pageTitle = title
    },
  },
  mounted() {
    document.title = 'NBX - ' + this.pageTitle
  }
}
</script>

<style lang="scss">
@import '~vue-material/src/core/stylesheets/variables.scss';
$sidebar-size: 280px;
$breakpoint: 1281px;

html,
body {
  height: 100%;
}

body {
  display: flex;
}

.container {
  min-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  transition: $swift-ease-out;

  @media (min-width: $breakpoint) {
    padding-left: $sidebar-size;
  }
}

.main-sidebar.md-sidenav {
  .md-sidenav-content {
    width: $sidebar-size;
    display: flex;
    flex-flow: column;

    @media (min-width: $breakpoint) {
      top: 0;
      pointer-events: auto;
      transform: translate3d(0, 0, 0);
      box-shadow: $material-shadow-2dp;
    }
  }

  .md-backdrop {
    @media (min-width: $breakpoint) {
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
      @media (min-width: $breakpoint) {
        display: none;
      }
    }

    .md-title {
      flex: 1;

      @media (min-width: $breakpoint) {
        margin-left: 8px;
      }
    }
  }
}
</style>
