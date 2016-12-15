<template>
  <div>
    <div class="loading" v-if="loading">
      Loading ...
    </div>
    <md-table-card v-if="suppliers">
      <md-table md-sort="rz" md-sort-type="asc" @sort="onSort">
        <md-table-header>
          <md-table-row>
            <md-table-head md-sort-by="rz">Nombre</md-table-head>
            <md-table-head md-sort-by="expiration_date">Vencimiento</md-table-head>
            <md-table-head md-sort-by="expired" md-numeric>Vencido ($)</md-table-head>
            <md-table-head md-sort-by="debt" md-numeric>Adeudado ($)</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="supplier in suppliers">
            <md-table-cell>
              <router-link :to="{name: 'suppliers:detail', params: { 'id': supplier.$id }}"><strong>{{ supplier.rz }}</strong>{{ supplier.name }}</router-link>
            </md-table-cell>
            <md-table-cell>{{ supplier.expiration_date | date }}</md-table-cell>
            <md-table-cell md-numeric>{{ supplier.expired | money }}</md-table-cell>
            <md-table-cell md-numeric>{{ supplier.debt | money }}</md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
      <nbx-table-pagination
        nbx-size="10"
        :nbx-page="tableOptions.page"
        :nbx-total="tableOptions.total"
        nbx-label=""
        nbx-separator="de"
        :nbx-page-options="false"
        @pagination="onPagination"></nbx-table-pagination>
    </md-table-card>
  </div>
</template>

<script>
import NbxTablePagination from 'ui/nbxTablePagination'

export default {
  name: 'supplier-list',
  data() {
    return {
      loading: false,
      error: null,
      suppliers: [],
      tableSort: {
        name: 'rz',
        type: 'asc',
      },
      tableOptions: {
        total: 0,
        page: 1,
      },
    }
  },
  created() {
    this.$parent.setTitle('Proveedores')
    this.fetchData()
  },
  watch: {
    'tableSort': 'fetchData',
  },
  methods: {
    onSort(ev) {
      this.tableSort.name = ev.name
      this.tableSort.type = ev.type
      this.fetchData()
    },
    onPagination(ev) {
      this.tableOptions.page = ev.page
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      let sort = {}
      sort[this.tableSort.name] = this.tableSort.type === 'desc'

      const params = {
        sort: JSON.stringify(sort),
        per_page: 10,
        page: this.tableOptions.page,
      }

      this.$http.get('suppliers', { params: params }).then(response => {
        this.loading = false
        this.error = null
        this.suppliers = response.data
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
