<template>
  <div class="supplier-orders">
    <orders-list :supplier-id="$route.params.id"></orders-list>
  </div>
</template>

<script>
import OrdersList from './OrdersList'

export default {
  name: 'supplier-orders',
  components: {
    OrdersList,
  }
}
</script>
