<template>
  <div class="supplier-detail">
    <div class="row">
      <div class="loading" v-if="loading">
        Loading ...
      </div>
      <div class="error" v-if="error">
        {{ error }}
      </div>
      <md-card class="general-data" v-if="supplier">
        <md-toolbar class="md-dense" md-theme="white">
          <h2 class="md-title" @mouseenter="onMouseEvent"
            @mouseleave="onMouseEvent">{{ supplier.rz }}</h2>
        </md-toolbar>
        <md-card-area>
          <md-tabs md-right :md-dynamic-height="false" class="md-transparent">
            <md-tab class="example-content" md-label="Datos">
              <div>Data tab content</div>
            </md-tab>
            <md-tab class="code-content" md-label="Contactos">
              <div>Contacts tab content</div>
            </md-tab>
            <md-tab class="notes-content" md-label="Notas">
              <div>Notes tab content</div>
            </md-tab>
          </md-tabs>
        </md-card-area>
      </md-card>
    </div>

    <div class="row">
      <invoices-table :nbx-supplier="supplier"></invoices-table>
      <orders-table :nbx-supplier="supplier"></orders-table>
    </div>

  </div>
</template>

<script>
import InvoicesTable from './InvoicesTable'
import OrdersTable from './OrdersTable'

export default {
  name: 'supplier-list',
  data() {
    return {
      loading: false,
      error: null,
      supplier: null,
    }
  },
  created() {
    this.$parent.setTitle('Proveedores')
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
  components: {
    InvoicesTable,
    OrdersTable,
  }
}
</script>

<style lang="scss" scoped>
.md-tabs {
  margin-top: -48px;
}

.md-card {
  margin-bottom: 16px;
}

.row {
  display: flex;
}

.general-data {
  flex: 1 1 100%;
}

.invoices,
.orders {
  flex: 1 1 50%;
}

.invoices {
  margin-right: 8px;
}

.orders {
  margin-left: 8px;
}
</style>
