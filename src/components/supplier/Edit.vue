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
import { diff, cloneDeep } from 'lib/utils'

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
  methods: {
    fetchData() {
      this.error = this.supplier = null
      this.loading = true

      this.$http.get('suppliers/' + this.$route.params.id).then(response => {
        this.loading = false
        this.supplier = response.data
        this._origSupplier = cloneDeep(this.supplier)
      }).catch(error => {
        this.loading = false
        this.error = error
      })
    },
    saveData() {
      let supplierData = diff(this._origSupplier, this.supplier)

      if (Object.keys(supplierData).length > 0) {
        this.$http.patch('suppliers/' + this.$route.params.id, supplierData).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error.data)
        })
      }

      this.$router.push({ name: 'suppliers:detail', params: { id: this.supplier.$id } })
    },
  },
}
</script>

<style lang="scss">
  .edit-card {
    width: 100%;
  }
</style>
