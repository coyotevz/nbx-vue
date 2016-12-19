<template>
  <md-table-card class="orders">
    <md-toolbar class="md-dense">
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
      <md-table-body>
        <md-table-row v-for="order in orders">
          <md-table-cell>{{ order.open_date | date }}</md-table-cell>
          <md-table-cell>{{ order.full_desc }}</md-table-cell>
          <md-table-cell>{{ order.status }}</md-table-cell>
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

export default {
  name: 'orders-table',
  props: ['nbxSupplier'],
  data() {
    return {
      loading: false,
      error: null,
      orders: [],
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
          sort: JSON.stringify({'open_date': true}),
          per_page: 5,
          page: this.tableOptions.page,
        }
      }

      this.$http.get('orders', options).then(response => {
        this.loading = false
        this.error = null
        this.orders = response.data
        this.tableOptions.total = parseInt(response.headers['x-total-count'], 10)
      }).catch(error => {
        this.loading = false
        this.error = error
      })
    },
  },
  components: {
    NbxTablePagination,
  },
}
</script>
