<template>
  <div>Supplier detail for {{ supplier.rz }}</div>
</template>

<script>
export default {
  name: 'supplier-list',

  data() {
    return {
      supplier: {}
    }
  },
  created() {
    this.$parent.setTitle('Proveedores')
    this.fetchData()
  },

  watch: {
    '$route'(to, from) {
      if (from.params.id !== to.params.id) {
        this.fetchData()
      }
    }
  },

  methods: {
    fetchData() {
      this.$http.get('suppliers/' + this.$route.params.id).then(response => {
        this.supplier = response.data
      }, response => {
        console.error('>> error')
      })
    }
  }
}
</script>
