<template>
  <div>
    <md-card>
      <md-card-area>
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head>Nombre</md-table-head>
              <md-table-head>Vencimiento</md-table-head>
              <md-table-head>Vencido ($)</md-table-head>
              <md-table-head>Adeudado ($)</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="supplier in suppliers">
              <md-table-cell>
                <router-link :to="{ name: 'suppliers:detail', params: { 'id': supplier.$id } }">{{ supplier.rz }}</router-link>
              </md-table-cell>
              <md-table-cell>{{ supplier.expiration_date | date }}</md-table-cell>
              <md-table-cell>{{ supplier.expired }}</md-table-cell>
              <md-table-cell>{{ supplier.debt }}</md-table-cell>
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
    }
  },

  created() {
    this.$parent.setTitle('Proveedores')
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.$http.get('suppliers').then(response => {
        this.suppliers = response.data
      }, response => {
        console.error('>> error')
      })
    }
  }
}
</script>
