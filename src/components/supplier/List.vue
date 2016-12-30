<template>
  <div class="ui-list suppliers-list">
    <div class="ui-list-header">
      <div class="ui-list-item">
        <div class="ui-list-cell header-title">Proveedores por nombre</div>
      </div>
    </div>
    <div class="ui-list-body" role="listbox" v-if="suppliers.length">
      <div class="ui-list-item" v-for="supplier in suppliers"
        @click="showDetail(supplier.$id)">
        <div class="ui-list-cell item-icon"><md-icon>business</md-icon></div>
        <div class="ui-list-cell item-title rz"><span>{{ supplier.rz }}</span></div>
        <div class="ui-list-cell item-secondary name">{{ supplier.name }}</div>
        <div class="ui-list-cell item-date expiration">
          {{ supplier.expiration_date | date }}
        </div>
        <div class="ui-list-cell item-money debt">{{ supplier.debt | money }}</div>
        <div class="ui-list-cell item-actions">
          <div class="action"><md-icon>more_vert</md-icon></div>
        </div>
      </div>
    </div>
    <div class="ui-list-empty" v-else>
      <div class="empty-notice">Todavía no tienes proveedores.</div>
      <div class="empty-create">Haz click en + para crear un proveedor.</div>
    </div>
    <md-button class="md-fab md-fab-bottom-right">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
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
        size: 10,
      },
    }
  },
  created() {
    this.$root.setTitle('Proveedores')
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
      this.tableOptions.size = ev.size
      this.tableOptions.page = ev.page
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      let sort = {}
      sort[this.tableSort.name] = this.tableSort.type === 'desc'

      const params = {
        sort: JSON.stringify(sort),
        per_page: this.tableOptions.size,
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
    },
    showDetail(id) {
      this.$router.push({ name: 'suppliers:detail', params: { 'id': id } })
    }
  },
}
</script>

<style lang="scss" scoped>

.suppliers-list {
  .header-title {
    width: 50%;
    margin-right: 52px;
  }
  .item-icon {
    color: #4285f4;
  }
}

/*
.suppliers-list {
  justify-content: space-between;

  .md-table-header,
  .md-table-body {
    background-color: #fff;
  }

  .no-content-table {
    text-align: center;
  }

  .md-table-pagination {
    // flex: 0;
  }

  .spinner-container {
    position: absolute;
    top: 56px;
    bottom: 56px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
*/
</style>
