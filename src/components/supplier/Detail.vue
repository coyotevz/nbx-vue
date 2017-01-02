<template>
  <div class="detail-view supplier-detail">
    <div class="summary-container" v-if="supplier">

      <div class="ui-sidebar">
        <div class="ui-sidebar-header">
            <router-link class="ui-title"
              :to="{name: 'suppliers:detail',
                    params: { id: supplier.$id } }" exact>
              {{ supplier.rz }}
            </router-link>
          <span class="ui-subtitle">{{ supplier.name }}</span>
        </div>

        <div class="ui-sidebar-menu">
          <ul>
            <router-link tag="li" class="menu-item"
              :to="{name: 'suppliers:detail:documents',
                    params: { id: supplier.$id } }">
              <a>Facturas</a>
            </router-link>
            <router-link tag="li" class="menu-item"
              :to="{name: 'suppliers:detail:orders',
                    params: { id: supplier.$id } }">
              <a>Pedidos</a>
            </router-link>
            <router-link tag="li" class="menu-item"
              :to="{name: 'suppliers:detail:data',
                    params: { id: supplier.$id } }">
              <a>Datos comerciales</a>
            </router-link>
            <router-link tag="li" class="menu-item"
              :to="{name: 'suppliers:detail:contacts',
                    params: { id: supplier.$id } }">
              <a>Contactos</a>
            </router-link>
          </ul>
        </div>
      </div>
    </div>

    <div class="area-container" v-if="supplier">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'supplier-list',
  data() {
    return {
      error: null,
      showActions: false,
    }
  },
  computed: mapGetters({
    supplier: 'getCurrentSupplier',
    loading: 'isLoading',
  }),
  created() {
    this.$root.setTitle('Proveedores')
    this.$store.dispatch('setCurrentSupplier', this.$route.params.id)
  },

  watch: {
    '$route'(to, from) {
      if (from.params.id !== to.params.id) {
        this.$store.dispatch('setCurrentSupplier', to.params.id)
      }
    }
  },
}
</script>
