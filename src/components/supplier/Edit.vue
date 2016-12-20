<template>
  <md-layout v-if="supplier">
    <md-layout md-flex-medium="50" md-flex-offset="25">
      <md-card class="edit-card">
        <md-card-header>
          <span class="md-subheading">Datos Basicos</span>
        </md-card-header>
        <md-card-content>
          <md-input-container>
            <label>Razón Social</label>
            <md-input v-model="supplier.rz" required></md-input>
          </md-input-container>
          <md-input-container>
            <label>Nombre Fantasía</label>
            <md-input v-model="supplier.name"></md-input>
          </md-input-container>
        </md-card-content>
        <md-card-actions>
          <md-button @click="$router.go(-1)">Cancelar</md-button>
          <md-button class="md-primary" @click="saveData()">Guardar</md-button>
        </md-card-actions>
      </md-card>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  name: 'supplier-edit',
  data() {
    return {
      supplier: null,
    }
  },
  created() {
    this.$root.setTitle('Editar Proveedor')
    this.fetchData()
  },
  watch: {
    supplier(newSupplier) {
      console.log('supplier change:', newSupplier)
    }
  },
  methods: {
    fetchData() {
      this.error = this.supplier = null
      this.loading = true

      this.$http.get('suppliers/' + this.$route.params.id).then(response => {
        this.loading = false
        this.supplier = response.data
      }).catch(error => {
        this.loading = false
        this.error = error
      })
    },
    saveData() {
      let supplier = {
        rz: this.supplier.rz,
        name: this.supplier.name,
      }

      this.$http.patch('suppliers/' + this.$route.params.id, supplier).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error.data)
      })
    },
  },
}
</script>

<style lang="scss">
  .edit-card {
    width: 100%;
  }
</style>
