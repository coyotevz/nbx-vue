<template>
  <md-table-card class="documents-list">
    <div class="spinner-container" v-if="loading">
      <md-spinner md-indeterminate></md-spinner>
    </div>

    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>Emisión</md-table-head>
          <md-table-head>Descripción</md-table-head>
          <md-table-head>Vencimiento</md-table-head>
          <md-table-head md-numeric>Monto</md-table-head>
          <md-table-head>Proveedor</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="document in documents" :class="statusRowBg(document)">
          <md-table-cell>{{ document.issue_date | date }}</md-table-cell>
          <md-table-cell class="invoice-status md-has-action">
            <span>{{ document.type }} {{ document.full_number }}</span>
            <div v-if="statusIcon(document)">
              <md-icon :class="statusIconClass(document)">money_off</md-icon>
            </div>
          </md-table-cell>
          <md-table-cell>{{ document.expiration_date | date }}</md-table-cell>
          <md-table-cell md-numeric>{{ document.total | money }}</md-table-cell>
          <md-table-cell>
            <router-link :to="{ name: 'suppliers:detail', params: { 'id': document.supplier_data.$id }}">{{ document.supplier_data.rz }}</router-link>
          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <nbx-table-pagination
      :nbx-page="tableOptions.page"
      :nbx-total="tableOptions.total"
      @pagination="onPagination"></nbx-table-pagination>
  </md-table-card>
</template>

<script>
import NbxTablePagination from 'ui/nbxTablePagination'

const statusShowIcon = [
  'STATUS_PENDING',
  'STATUS_EXPIRED',
]

export default {
  name: 'documents-list',
  data() {
    return {
      loading: false,
      error: null,
      documents: [],
      tableOptions: {
        total: 0,
        page: 1,
        size: 10,
      }
    }
  },
  created() {
    this.$root.setTitle('Facturas')
    this.fetchData()
  },
  methods: {
    onPagination(ev) {
      this.tableOptions.size = ev.size
      this.tableOptions.page = ev.page
      this.fetchData()
    },
    fetchData() {
      this.error = null
      this.loading = true

      let options = {
        params: {
          sort: JSON.stringify({'expiration_date': true}),
          per_page: this.tableOptions.size,
          page: this.tableOptions.page,
        }
      }

      this.$http.get('documents', options).then(response => {
        this.loading = false
        this.error = null
        this.documents = response.data
        this.tableOptions.total = parseInt(response.headers['x-total-count'], 10)
      }).catch(error => {
        this.loading = false
        this.error = error
      })
    },
    statusIcon(invoice) {
      return statusShowIcon.includes(invoice.doc_status)
    },
    statusRowBg(invoice) {
      if (invoice.doc_status === 'STATUS_EXPIRED') {
        return 'bg-status-warning'
      } else if (invoice.doc_status === 'STATUS_PENDING') {
        return 'bg-status-atention'
      }
      return ''
    },
    statusIconClass(invoice) {
      return invoice.doc_status === 'STATUS_EXPIRED' ? 'md-accent' : ''
    },
  },
  components: {
    NbxTablePagination,
  }
}
</script>
