<template>
  <div class="ui-list suppliers-list">
    <div class="ui-list-header">
      <div class="ui-list-item">
        <div class="ui-list-cell header-title">Proveedores por nombre</div>
      </div>
    </div>
    <div class="ui-list-loading" v-if="loading">
      <md-spinner md-indeterminate></md-spinner>
    </div>
    <div class="ui-list-body" role="listbox" v-else-if="suppliers && suppliers.length">
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
          <md-menu ref="menu" md-size="4" md-direction="bottom left" md-align-trigger>
            <div class="action" @click.prevent.stop md-menu-trigger><md-icon>more_vert</md-icon></div>

            <md-menu-content>
              <md-menu-item>
                <md-icon>phone</md-icon>
                <span>My Item 1</span>
              </md-menu-item>
              <md-menu-item>
                <md-icon>phone</md-icon>
                <span>My Item 2</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>

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
import { mapGetters } from 'vuex'
export default {
  name: 'supplier-list',
  data() {
    return {
      error: null,
    }
  },
  created() {
    this.$root.setTitle('Proveedores')
    this.$store.dispatch('fetchSuppliers')
  },
  computed: mapGetters({
    suppliers: 'getSuppliers',
    loading: 'isLoading',
  }),
  methods: {
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
</style>
