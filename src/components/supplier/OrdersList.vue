<template>
  <div class="ui-list supplier-orders-list" v-if="!loading">
    <div class="ui-list-header">
      <div class="ui-list-item">
        <div class="ui-list-cell">
          <span>Pedidos</span>
          <template v-if="total_orders > 5">
            <span>({{ total_orders }})</span>
            <router-link class="view-more"
              :to="{ name: 'suppliers:detail:orders',
                     params: { id: $route.params.id } }">Ver más</router-link>
          </template>
        </div>
      </div>
    </div>

    <div class="ui-list-body" role="listbox" v-if="orders.length">
      <div class="ui-list-item" v-for="order in orders"
        @click="showOrderDetail(order.$uri)">
        <div class="ui-list-cell item-icon"><md-icon>book</md-icon></div>
        <div class="ui-list-cell item-title">{{ order.full_desc }}</div>
        <div class="ui-list-cell item-date">
          <span>{{ order.open_date | date }}</span>
        </div>
        <div class="ui-list-cell item-secondary">{{ order.status }}</div>
        <div class="ui-list-cell item-actions">
          <div class="action"><md-icon>more_vert</md-icon></div>
        </div>
      </div>
    </div>

    <div class="ui-list-empty" v-else>
      <div class="empty-notice">Todavía no tienes pedidos para este proveedor.</div>
      <div class="empty-create">Haz click en <md-button class="md-raised md-primary">Nuevo Pedido</md-button> para crear un pedido.</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'supplier-orders-list',
  props: {
    supplierId: {
      type: [String, Number],
      required: true,
    },
    options: {
      type: Object,
      default() {
        return {
          limit: 5,
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      orders: [],
      total_orders: 0,
    }
  },
  watch: {
    'supplierId': 'fetchData'
  },
  methods: {
    fetchData() {
      if (this.supplier === null) return
      this.error = null
      this.loading = true

      this.$http.get('orders', this.getParams()).then(response => {
        this.loading = false
        this.orders = response.data
        this.total_orders = parseInt(response.headers['x-total-count'])
      }).catch(error => {
        this.loading = false
        this.error = error
      })
    },
    getParams() {
      let sort = this.options.sort ? this.options.sort : {'open_date': true}
      let limit = this.options.limit ? this.options.limit : 5

      return {
        params: {
          where: JSON.stringify({'supplier': parseInt(this.supplierId)}),
          sort: JSON.stringify(sort),
          per_page: limit,
        }
      }
    },
    showOrderDetail(id) {
      console.log('show order detail for', id)
    },
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.supplier-orders-list {
  .item-icon {
    color: #f6b400;
  }
}
</style>
