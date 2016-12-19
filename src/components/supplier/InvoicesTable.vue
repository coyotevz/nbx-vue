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
        <md-table-row v-for="invoice in invoices" :class="statusRowBg(invoice)">
          <md-table-cell>{{ invoice.issue_date | date }}</md-table-cell>
          <md-table-cell class="invoice-status md-has-action">
            <span>{{ invoice.short_type }} {{ invoice.full_number }}</span>
            <div v-if="statusIcon(invoice)">
              <md-icon :class="statusIconClass(invoice)">money_off</md-icon>
              <md-tooltip md-direction="top">{{ statusIconTooltip(invoice) }}</md-tooltip>
            </div>
          </md-table-cell>
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
import dateFns from 'date-fns'

const statusShowIcon = [
  'STATUS_PENDING',
  'STATUS_EXPIRED'
]

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
    statusIconTooltip(invoice) {
      if (invoice.doc_status === 'STATUS_EXPIRED') {
        return 'Vencida desde el ' + dateFns.format(invoice.expiration_date.$date, 'DD/MM/YYYY')
      } else if (invoice.doc_status === 'STATUS_PENDING') {
        return 'Vence el ' + dateFns.format(invoice.expiration_date.$date, 'DD/MM/YYYY')
      }
      return 'No vencida'
    },
  },
  components: {
    NbxTablePagination,
  },
}
</script>

<style lang="scss">
.md-table {
  .md-table-row {
    &.bg-status-atention { background-color: #ddd; }
    &.bg-status-warning { background-color: rgba(244,67,54,0.12); }
  }
  .md-table-cell {
    font-size: inherit;
  }
  .invoice-status {
    .md-icon {
      width: 20px;
      min-width: 20px;
      height: 20px;
      min-height: 20px;
      font-size: 18px;
      margin: initial;
    }
  }
}
</style>
