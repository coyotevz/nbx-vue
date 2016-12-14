<template>
  <div>
    <div class="loading" v-if="loading">
      Loading ...
    </div>
    <md-card v-if="suppliers">
      <md-card-area>
        <md-table md-sort="rz" md-sort-type="desc" @sort="onSort">
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
        <!--md-table-pagination
          md-size="5"
          md-total="10"
          md-page="1"
          md-label="Rows"
          md-separator="of"
          :md-page-options="[5, 10, 25, 50]"
          @pagination="onPagination"></md-table-pagination>
      </md-card-area-->
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
    onSort(ev) {
      console.log('onSort:', ev)
    },
    onPagination(ev) {
      console.log('onPagination:', ev)
    },
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

<style lang="scss">
.md-table-card {
}
</style>
