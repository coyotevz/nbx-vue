<template>
  <div class="supplier-summary">
    <invoices-list :supplier-id="$route.params.id"></invoices-list>
    <orders-list :supplier-id="$route.params.id"></orders-list>
  </div>
</template>

<script>
import InvoicesList from './InvoicesList'
import OrdersList from './OrdersList'

export default {
  name: 'supplier-profile',
  components: {
    InvoicesList,
    OrdersList,
  }
}
</script>
