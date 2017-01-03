<template>
  <div class="supplier-data">
    <md-layout :md-gutter="8">
      <md-layout>
        <md-card>
          <md-card-header>
            <div class="md-title">Datos Fiscales</div>
            <md-button class="md-icon-button edit md-dense"><md-icon>edit</md-icon></md-button>
          </md-card-header>

          <md-card-content>
            Lorem corrupti corrupti quaerat labore quo Natus libero ipsa nostrum ad perspiciatis Quibusdam vel iusto dolor fugiat eos? Sint reiciendis animi unde perferendis libero voluptatibus? Veritatis nisi tempore adipisci facilis?
          </md-card-content>

          <md-card-actions>
            <md-button class="md-primary">Action</md-button>
            <md-button>Action</md-button>
          </md-card-actions>
        </md-card>
      </md-layout>
      <md-layout>
        <md-card>
          <md-card-header>
            <div class="md-title">Datos Fiscales</div>
            <md-button class="md-icon-button edit md-dense"><md-icon>edit</md-icon></md-button>
          </md-card-header>

          <md-card-content>
            Lorem corrupti corrupti quaerat labore quo Natus libero ipsa nostrum ad perspiciatis Quibusdam vel iusto dolor fugiat eos? Sint reiciendis animi unde perferendis libero voluptatibus? Veritatis nisi tempore adipisci facilis?
          </md-card-content>

          <md-card-actions>
            <md-button class="md-primary">Action</md-button>
            <md-button>Action</md-button>
          </md-card-actions>
        </md-card>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'supplier-data',
  computed: mapGetters({
    supplier: 'getCurrentSupplier'
  })
}
</script>

<style lang="scss">
.supplier-data {
  padding-top: 25px;

  .md-card {
    margin: 0 4px 16px;

    .md-card-header {
      display: flex;
      .md-title {
        flex: 1;
        font-size: 16px;
        line-height: 20px;
        margin-top: 0 !important;
      }
      .md-button.md-icon-button {
        line-height: 20px;
        margin-top: -8px;
        i {
          font-size: 20px;
          width: 20px;
          min-width: 20px;
          height: 20px;
          min-height: 20px;
        }
      }
    }
  }
}
</style>
