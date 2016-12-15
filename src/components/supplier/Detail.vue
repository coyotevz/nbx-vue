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
        <md-toolbar class="md-dense" v-md-theme="'white'">
          <h2 class="md-title">{{ supplier.rz }}</h2>
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
      <md-table-card class="invoices" ref="invoicesTable">
        <md-toolbar>
          <h1 class="md-title">Facturas</h1>
          <md-button class="md-icon-button">
            <md-icon>filter_list</md-icon>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>
        </md-toolbar>

        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head>Fecha</md-table-head>
              <md-table-head>Documento</md-table-head>
              <md-table-head md-numeric>Total ($)</md-table-head>
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row v-for="invoice in invoices">
              <md-table-cell>{{ invoice.issue_date | date }}</md-table-cell>
              <md-table-cell>{{ invoice.full_desc }}</md-table-cell>
              <md-table-cell md-numeric>{{ invoice.total | number }}</md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
        <nbx-table-pagination
          nbx-size="5"
          :nbx-page="invoicesTable.page"
          :nbx-total="invoicesTable.total"
          nbx-label="Mostrando"
          nbx-separator="de"
          :nbx-page-options="false"
          @pagination="onInvoicesPagination"></nbx-table-pagination>
        <div>
          page: {{ invoicesTable.page }}, total: {{ invoicesTable.total }}
        </div>

      </md-table-card>

      <md-table-card class="orders" ref="ordersTable">
        <md-toolbar>
          <h1 class="md-title">Pedidos</h1>
          <md-button class="md-icon-button">
            <md-icon>filter_list</md-icon>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>
        </md-toolbar>

        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head>Fecha</md-table-head>
              <md-table-head>Número</md-table-head>
              <md-table-head>Estado</md-table-head>
            </md-table-row>
          </md-table-header>
        </md-table>
      </md-table-card>
    </div>

  </div>
</template>

<script>
import NbxTablePagination from '../../ui/nbxTablePagination'
export default {
  name: 'supplier-list',

  data() {
    return {
      loading: false,
      error: null,
      supplier: null,
      invoices: [],
      invoicesTable: {
        total: 30,
        page: 1,
      }
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

    onInvoicesPagination(ev) {
      this.invoicesTable.page = ev.page
      this.fetchData()
      console.log('onPagination:', ev)
    },

    fetchData() {
      this.error = this.supplier = null
      this.loading = true
      const sid = this.$route.params.id
      const docOptions = {
        params: {
          where: '{"supplier":' + sid + '}',
          sort: JSON.stringify({ 'issue_date': true }),
          per_page: 5,
          page: this.invoicesTable.page,
        }
      }

      this.$http.get('suppliers/' + sid).then(response => {
        this.loading = false
        this.supplier = response.data
      }, response => {
        this.loading = false
        this.error = response
        console.error('>> error')
      })

      // TODO separate this into defferents calls
      this.$http.get('documents', docOptions).then(response => {
        this.invoices = response.data
        console.log('total count:', response.headers.get('X-Total-Count'))
        window.response = response
      }, response => {
        console.log('>> error')
      })
    }
  },

  components: {
    NbxTablePagination
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
