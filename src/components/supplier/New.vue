<template>
  <md-layout>
    <md-layout md-flex="50">
      <md-card class="new-supplier">
        <md-card-header>
          <span class="md-subheading">Información Básica</span>
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
          <md-button class="md-primary" @click="saveData()">Guardar</md-button>
        </md-card-actions>
      </md-card>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  name: 'supplier-new',
  data() {
    return {
      supplier: {
        rz: null,
        name: null,
      },
    }
  },
  methods: {
    saveData() {
      console.log('saveData:', JSON.stringify(this.supplier))
    }
  }
}
</script>

<style lang="scss" scoped>
.md-layout {
  justify-content: space-around;
}
.new-supplier {
  width: 100%;
  margin: 20px;
}
</style>
