<template>
  <div>
    <div class="loading" v-if="loading">
      Loading ...
    </div>
    <md-card v-if="suppliers">
      <md-card-area>
        <md-table md-sort="rz" @sort="tableSort = $event">
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
                <router-link :to="{ name: 'suppliers:detail', params: { 'id': supplier.$id } }"><strong>{{ supplier.rz }}<strong>{{ supplier.name }}</router-link>
              </md-table-cell>
              <md-table-cell>{{ supplier.expiration_date | date }}</md-table-cell>
              <md-table-cell md-numeric>{{ supplier.expired | money }}</md-table-cell>
              <md-table-cell md-numeric>{{ supplier.debt | money }}</md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-card-area>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'supplier-list',

  data() {
    return {
      suppliers: [],
      loading: false,
      tableSort: {
        name: 'rz',
        type: 'asc',
      }
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
    fetchData() {
      this.loading = true
      let sort = {}
      sort[this.tableSort.name] = this.tableSort.type === 'desc'

      const params = {
        sort: JSON.stringify(sort),
        per_page: 10,
      }
      this.$http.get('suppliers', { params: params }).then(response => {
        this.suppliers = response.data
        this.loading = false
      }, response => {
        console.error('>> error')
      })
    }
  }
}
</script>
