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
export default {
  name: 'supplier-list',
  data() {
    return {
      loading: false,
      error: null,
      supplier: null,
      showActions: false,
    }
  },
  created() {
    this.$root.setTitle('Proveedores')
    this.fetchData()
  },

  watch: {
    '$route'(to, from) {
      if (from.params.id !== to.params.id) {
        this.fetchData()
      }
    }
  },

  methods: {
    fetchData() {
      this.error = this.supplier = null
      this.loading = true

      this.$http.get('suppliers/' + this.$route.params.id).then(response => {
        this.loading = false
        this.supplier = response.data
      }).catch(error => {
        this.loading = false
        this.error = error
      })
    },
    onMouseEvent(ev) {
      console.log('on mouse over:', ev)
    }
  },
}
</script>
