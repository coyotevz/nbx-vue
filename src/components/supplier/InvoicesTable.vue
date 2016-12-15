<template>
  <md-table-card class="invoices">
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
          <md-table-cell>{{ desc(invoice) }}</md-table-cell>
          <md-table-cell md-numeric>{{ invoice.total | number }}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <nbx-table-pagination
      nbx-size="5"
      :nbx-page="tableOptions.page"
      :nbx-total="tableOptions.total"
      nbx-label=""
      nbx-separator="de"
      :nbx-page-options="false"
      @pagination="onPagination"></nbx-table-pagination>
  </md-table-card>
</template>

<script>
import NbxTablePagination from 'ui/nbxTablePagination'
import { paddingLeft } from 'lib/utils'

const docTypesShort = {
  'TYPE_FACTURA_A': 'FAC',
  'TYPE_NOTA_CREDITO_A': 'NC ',
  'TYPE_PRESUPUESTO': 'PRE',
}

export default {
  name: 'invoices-table',
  props: ['nbxSupplier'],
  data() {
    return {
      loading: false,
      error: null,
      invoices: [],
      tableOptions: {
        total: 0,
        page: 1,
      }
    }
  },
  watch: {
    'nbxSupplier': 'fetchData'
  },
  methods: {
    onPagination(ev) {
      this.tableOptions.page = ev.page
      this.fetchData()
    },
    fetchData() {
      if (this.nbxSupplier === null) return
      this.error = null
      this.loading = true

      let options = {
        params: {
          where: JSON.stringify({'supplier': this.nbxSupplier.$id}),
          sort: JSON.stringify({'issue_date': true}),
          per_page: 5,
          page: this.tableOptions.page,
        }
      }

      this.$http.get('documents', options).then(response => {
        this.loading = false
        this.error = null
        this.invoices = response.data
        this.tableOptions.total = parseInt(response.headers['x-total-count'], 10)
      }).catch(error => {
        this.loading = false
        this.error = error
      })
    },
    desc(invoice) {
      return docTypesShort[invoice.doc_type] + ' ' +
        paddingLeft('0000', invoice.point_sale) + '-' +
        paddingLeft('0000000', invoice.number)
    }
  },
  components: {
    NbxTablePagination,
  },
}
</script>
