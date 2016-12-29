<template>
  <div class="ui-list supplier-invoices-list" v-if="!loading">
    <div class="ui-list-header">
      <div class="ui-list-item">
        <div class="ui-list-cell">
          <span>Facturas</span>
          <template v-if="total_invoices > options.limit">
            <span>({{ total_invoices }})</span>
            <router-link class="view-more"
              :to="{ name: 'suppliers:detail:documents',
                     params: { id: $route.params.id } }">Ver más</router-link>
          </template>
        </div>
      </div>
    </div>

    <div class="ui-list-body" role="listbox" v-if="invoices.length">
      <div class="ui-list-item" v-for="invoice in invoices"
        @click="showInvoiceDetail(invoice.$uri)">
        <div class="ui-list-cell item-icon"><md-icon>description</md-icon></div>
        <div class="ui-list-cell item-title">
          {{ invoice.type }} {{ invoice.full_number }}
        </div>
        <div class="ui-list-cell item-date issue">
          <span>{{ invoice.issue_date | date }}</span>
        </div>
        <div class="ui-list-cell item-date expiration" :class="statusClass(invoice)">
          <span>{{ invoice.expiration_date | date }}</span>
        </div>
        <div class="ui-list-cell item-money" :class="statusClass(invoice)">
          {{ invoice.total | money }}
        </div>
        <div class="ui-list-cell item-actions">
          <div class="action"><md-icon>more_vert</md-icon></div>
        </div>
      </div>
    </div>

    <div class="ui-list-empty" v-else>
      <div class="empty-notice">Todavía no tienes facturas de este proveedor.</div>
      <div class="empty-create">Haz click en <md-button class="md-raised md-primary">Nueva Factura</md-button> para crear una factura.</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'supplier-invoices-list',
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
      invoices: [],
      total_invoices: 0,
    }
  },
  watch: {
    'supplierId': 'fetchData',
  },
  methods: {
    fetchData() {
      if (this.supplierId === null) return
      this.error = null
      this.loading = true

      this.$http.get('documents', this.getParams()).then(response => {
        this.loading = false
        this.invoices = response.data
        this.total_invoices = parseInt(response.headers['x-total-count'])
      }).catch(error => {
        this.loading = false
        this.error = error
      })
    },
    getParams() {
      let sort = this.options.sort ? this.options.sort : {'issue_date': true}
      let limit = this.options.limit ? this.options.limit : 5

      return {
        params: {
          where: JSON.stringify({'supplier': parseInt(this.supplierId)}),
          sort: JSON.stringify(sort),
          per_page: limit,
        }
      }
    },
    statusClass(invoice) {
      if (invoice.doc_status === 'STATUS_EXPIRED') {
        return 'status-expired'
      } else if (invoice.doc_status === 'STATUS_PENDING') {
        return 'status-pending'
      }
      return ''
    },
    showInvoiceDetail(id) {
      console.log('show invoice detail for:', id)
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.supplier-invoices-list {
  .item-icon {
    color: #0f9d58;
  }
}

.expiration,
.item-money {
  &.status-pending {
    color: #111 !important;
  }
  &.status-expired {
    color: rgba(255,87,34,0.77) !important;
  }
}
</style>
