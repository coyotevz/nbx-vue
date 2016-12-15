<template>
  <md-table-card class="orders" ref="ordersTable">
    <md-toolbar>
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
    </md-table>
  </md-table-card>
</template>

<script>
export default {
  name: 'orders-table',
  props: ['nbxSupplier']
}
</script>
