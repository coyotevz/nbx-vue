<template>
  <md-table-card class="orders-list">
    <div class="spinner-container" v-if="loading">
      <md-spinner md-indeterminate></md-spinner>
    </div>

    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>Fecha</md-table-head>
          <md-table-head>Descripción</md-table-head>
          <md-table-head>Estado</md-table-head>
          <md-table-head>Proveedor</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="order in orders">
          <md-table-cell>{{ order.open_date | date }}</md-table-cell>
          <md-table-cell>{{ order.full_desc }}</md-table-cell>
          <md-table-cell>{{ order.status }}</md-table-cell>
          <md-table-cell>
            <router-link :to="{ name: 'suppliers:detail', params: { 'id': order.supplier_data.$id }}">{{ order.supplier_data.rz }}</router-link>
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

export default {
  name: 'orders-list',
  data() {
    return {
      loading: false,
      error: null,
      orders: [],
      tableOptions: {
        total: 0,
        page: 1,
        size: 10,
      }
    }
  },
  created() {
    this.$root.setTitle('Pedidos')
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
          sort: JSON.stringify({'open_date': true}),
          per_page: this.tableOptions.size,
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
    }
  },
  components: {
    NbxTablePagination,
  }
}
</script>
