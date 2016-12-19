<template>
  <div class="supplier-detail">
    <div class="row">
      <md-card class="general-data" v-if="supplier">
        <md-toolbar class="md-dense" md-theme="blue-grey"
          @mouseenter.native="showActions = true"
          @mouseleave.native="showActions = false">
          <h2 class="md-title">{{ supplier.rz }}</h2>
          <div class="supplier-actions" v-if="showActions">
            <md-button class="md-icon-button">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-card-area>
          <md-tabs md-centered :md-dynamic-height="false" class="md-transparent">
            <md-tab class="notes-content" md-label="Notas" v-if="supplier.notes">
              <div>{{ supplier.notes }}</div>
            </md-tab>
            <md-tab class="banks-content" md-label="Bancos">
              <span>Bank data</span>
            </md-tab>
            <md-tab class="contacts-content" md-label="Contactos">
              <div>Contacts tab content</div>
            </md-tab>
            <md-tab class="comercial-content" md-label="Acuerdos">
              <span>Comercial agreetment data</span>
            </md-tab>
            <md-tab class="data-content" md-label="Datos" v-if="supplier.address.length">
              <span><strong>Dirección</strong> {{ supplier.address[0].street }} {{ supplier.address[0].streetnumber }}</span>
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
      showActions: false,
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
  // margin-top: -48px;
}

.md-card {
  margin-bottom: 16px;

  .md-toolbar {
    .md-title {
      flex: 1;
    }
  }
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
