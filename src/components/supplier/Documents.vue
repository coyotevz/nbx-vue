<template>
  <div class="supplier-documents">
    <invoices-list :supplier-id="$route.params.id"></invoices-list>
  </div>
</template>

<script>
import InvoicesList from './InvoicesList'

export default {
  name: 'supplier-documents',
  components: {
    InvoicesList,
  }
}
</script>
